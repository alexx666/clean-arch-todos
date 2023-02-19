import { idempotent } from './idempotency';
import { IdempotencyConfig } from './idempotency.config';

describe('idempotent', () => {
	const cache = {
		get: jest.fn(),
		lock: jest.fn(),
		update: jest.fn(),
	};

	const identifier = {
		getIdentity: jest.fn()
	}

	const config: IdempotencyConfig = {
		cache,
		identifier,
	};

	class TestClass {
		@idempotent(config)
		async testMethod(...args: any[]) {
			return { result: args };
		}
	}

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return the response from the cache when it exists', async () => {
		const testInstance = new TestClass();
		const requestId = 'testRequestId';
		const cachedResponse = { result: [1, 2, 3] };
		identifier.getIdentity.mockReturnValue(requestId);
		cache.get.mockResolvedValue({ response: cachedResponse });

		const result = await testInstance.testMethod({ headers: { 'X-Request-Id': requestId } });

		expect(identifier.getIdentity).toHaveBeenCalled()
		expect(cache.get).toHaveBeenCalledWith(requestId);
		expect(result).toEqual(cachedResponse);
		expect(cache.lock).not.toHaveBeenCalled();
		expect(cache.update).not.toHaveBeenCalled();
	});

	it('should throw an error when the request is already in progress', async () => {
		const testInstance = new TestClass();
		const requestId = 'testRequestId';
		const cachedRequest = { timeout: Date.now() / 1000 + 60 };
		cache.get.mockResolvedValue(cachedRequest);

		await expect(testInstance.testMethod({ headers: { 'X-Request-Id': requestId } })).rejects.toThrow(
			'Request already in progress!'
		);

		expect(identifier.getIdentity).toHaveBeenCalled()
		expect(cache.get).toHaveBeenCalledWith(requestId);
		expect(cache.lock).not.toHaveBeenCalled();
		expect(cache.update).not.toHaveBeenCalled();
	});

	it('should lock the request, handle it, and update the cache when it is a new request', async () => {
		const testInstance = new TestClass();
		const requestId = 'testRequestId';
		const input = { headers: { 'X-Request-Id': requestId } };
		identifier.getIdentity.mockReturnValue(requestId);
		cache.get.mockResolvedValue(undefined);

		const result = await testInstance.testMethod(input);

		expect(identifier.getIdentity).toHaveBeenCalled()
		expect(cache.get).toHaveBeenCalledWith(requestId);
		expect(cache.lock).toHaveBeenCalledWith(requestId);
		expect(cache.update).toHaveBeenCalledWith(requestId, { result: [input] });
		expect(result).toEqual({ result: [input] });
	});
});
