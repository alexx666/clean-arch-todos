# Changelog

## [1.3.0](https://github.com/alexx666/clean-arch-todos/compare/clean-arch-v1.2.0...clean-arch-v1.3.0) (2023-03-05)


### Features

* **api:** get lists endpoint ([4152f09](https://github.com/alexx666/clean-arch-todos/commit/4152f092d65799d8881dd9124a59fdb4f1ebec52))
* **cli:** show lists command ([4152f09](https://github.com/alexx666/clean-arch-todos/commit/4152f092d65799d8881dd9124a59fdb4f1ebec52))


### Bug Fixes

* use get requestId header name from env variables, if present ([61dbcbd](https://github.com/alexx666/clean-arch-todos/commit/61dbcbd7f60a4c34161e3d4d7c5dcfc27570e2d7))


### Performance Improvements

* **core:** check if instance of handler exists before creating a new one ([d6176cb](https://github.com/alexx666/clean-arch-todos/commit/d6176cbb74f680031314982f100b1d4545ab766c))

## [1.2.0](https://github.com/alexx666/clean-arch-todos/compare/clean-arch-v1.1.1...clean-arch-v1.2.0) (2023-02-19)


### Features

* add idempotency table ([49e5fdb](https://github.com/alexx666/clean-arch-todos/commit/49e5fdb864c31aefdab434453c28feea1618e807))
* **cli:** implement http decider ([114b25b](https://github.com/alexx666/clean-arch-todos/commit/114b25bf4e29999780e2b2f1918bb1f862ddcb16))
* **cli:** implement simple exponential retry strategy ([f0cfac0](https://github.com/alexx666/clean-arch-todos/commit/f0cfac010d9b11ccb0a49c54a9b0a98f3e5925e4))
* deploy web with private bucket and behind CDN ([1099486](https://github.com/alexx666/clean-arch-todos/commit/109948683dfc710dbd035333fb3a3fea9d7be045))
* implement commun CDN for front and back ([47beb6e](https://github.com/alexx666/clean-arch-todos/commit/47beb6e2a52ab10047115428a68a5bbc22f7ec4d))
* implement idempotency for all commands handled by the api ([732ce93](https://github.com/alexx666/clean-arch-todos/commit/732ce93bbfdab712337f6c7c23b99159c1d2a1c1))
* make create-list operation idempotent (tests pending) ([c6572b6](https://github.com/alexx666/clean-arch-todos/commit/c6572b653df9e09f7d09574bd5272cebc79026d0))
* require and send token to identify request ([884e244](https://github.com/alexx666/clean-arch-todos/commit/884e244800896a1652c0ee62a9cb87b9ed4afc94))


### Bug Fixes

* aliviate backpressure when storing events ([5ff70c2](https://github.com/alexx666/clean-arch-todos/commit/5ff70c2e39a2c31b5c47689f5d50febbaa791398))
* **api:** add point in time recovery to events database ([276e273](https://github.com/alexx666/clean-arch-todos/commit/276e2730b6e6818d171e3d567b5622c268e3209c))
* **api:** improve handling of api configuration ([47beb6e](https://github.com/alexx666/clean-arch-todos/commit/47beb6e2a52ab10047115428a68a5bbc22f7ec4d))
* **ci:** add PAT secret for release action ([3d1eb7e](https://github.com/alexx666/clean-arch-todos/commit/3d1eb7e241aa51d1c04ff8cf56f95cfe8ede8697))
* **ci:** update publish conditions ([3d1eb7e](https://github.com/alexx666/clean-arch-todos/commit/3d1eb7e241aa51d1c04ff8cf56f95cfe8ede8697))
* remove linting and test issues after refactor ([085adb8](https://github.com/alexx666/clean-arch-todos/commit/085adb8d58b68e3994b000f30c9ded71742e862a))
* **security:** add SNS principal to queue policy ([1cbb10c](https://github.com/alexx666/clean-arch-todos/commit/1cbb10cc9bc32b5e3278fcf9747131d2c4f7ed47))
* **security:** set encryption for SNS & SQS ([1cbb10c](https://github.com/alexx666/clean-arch-todos/commit/1cbb10cc9bc32b5e3278fcf9747131d2c4f7ed47))

## [1.1.1](https://github.com/alexx666/clean-arch-todos/compare/clean-arch-v1.1.0...clean-arch-v1.1.1) (2023-01-14)


### Bug Fixes

* **automation:** add correct id to release step so that the rest of the process may finish ([359cf40](https://github.com/alexx666/clean-arch-todos/commit/359cf40222cc3626a6ccc332f1ffe703f786ebbf))

## [1.1.0](https://github.com/alexx666/clean-arch-todos/compare/clean-arch-v1.0.0...clean-arch-v1.1.0) (2023-01-14)


### Features

* add allow expired policy rule ([8b88140](https://github.com/alexx666/clean-arch-todos/commit/8b881404e89750796adade34c29a3e57027593b3))
* add angular project to workspace ([480744c](https://github.com/alexx666/clean-arch-todos/commit/480744c5280790e8e9c47c6398cfb14807b8fbff))
* add create feature and change internal repository models ([a15f3b1](https://github.com/alexx666/clean-arch-todos/commit/a15f3b1f318e976d0d80c53188e32487a47b56b1))
* add hateoas implementation for list todos in the api ([671fdc0](https://github.com/alexx666/clean-arch-todos/commit/671fdc060411d464a97008fa84cdcf3d91da4873))
* add list creation and use value object to check if name has the correct format ([45f780b](https://github.com/alexx666/clean-arch-todos/commit/45f780bb20c4ca945e5b73273597685f56b7456e))
* add lists & policy into domain model and refactor modules and apps to conform to new spec. Also decouple domain models from interactor request/response interfaces ([0655056](https://github.com/alexx666/clean-arch-todos/commit/0655056e360a2fb1913e536b5c200fb2dc4a507b))
* add pagination support ([6d69468](https://github.com/alexx666/clean-arch-todos/commit/6d694685858d0c635e858507c07d5fce7be8c429))
* add provider data conversion from document to entity and test in-memory gateway ([4771d28](https://github.com/alexx666/clean-arch-todos/commit/4771d28c68a4d1c8eb325f9e0ef2ecafd5d2ea9d))
* add search bar ([9e92bed](https://github.com/alexx666/clean-arch-todos/commit/9e92bed179a1e72f1a2774327e7416e108201445))
* add support for query limit. TODO improve input validation ([e9c9ac6](https://github.com/alexx666/clean-arch-todos/commit/e9c9ac6ab83393dc9aa182a1d31a1ac93aaeb194))
* add verdaccion support ([baf822a](https://github.com/alexx666/clean-arch-todos/commit/baf822a32aea7cbf4b9cd0b20902b1ff8bea9989))
* **api:** add aws implementation for mediator ([febfe49](https://github.com/alexx666/clean-arch-todos/commit/febfe49053569a03e16d36d56fa3c9d77b888121))
* **api:** add mediator for inter process comunication ([60f24d2](https://github.com/alexx666/clean-arch-todos/commit/60f24d271ebb07f340908e1d21b6279dc508312b))
* **api:** save events to event store using backend handler ([5f230bc](https://github.com/alexx666/clean-arch-todos/commit/5f230bc0f3250e34b3cf7ecdf662386673ac3e66))
* configure nx for project ([af46a4d](https://github.com/alexx666/clean-arch-todos/commit/af46a4d9c0fbfefc4ae658d3eb5a98fa4af2f7f1))
* cursor (marker) pagination ([8229047](https://github.com/alexx666/clean-arch-todos/commit/82290476b100c3693c0a515666ae21002e5128a5))
* define Dynamo event store ([6e977e6](https://github.com/alexx666/clean-arch-todos/commit/6e977e64fdeb19dcb131c7b451f126f89e687496))
* define projection for read model ([807a8b3](https://github.com/alexx666/clean-arch-todos/commit/807a8b3e78778b69477920d0eb95890eb5b33fa0))
* implement all api calls via cli ([8c0eb70](https://github.com/alexx666/clean-arch-todos/commit/8c0eb70fd5d17ba3e143d8d04159aa75e4ca9a48))
* implement delete on the frontend ([4402dce](https://github.com/alexx666/clean-arch-todos/commit/4402dcefc69a541bcb2c97ad24f061bcea0f1582))
* implement rest of todos.service.ts ([f756345](https://github.com/alexx666/clean-arch-todos/commit/f7563452c9dafb524d1b0d925d99c23ae026c0b7))
* implement todo listing from api via cli ([083ea16](https://github.com/alexx666/clean-arch-todos/commit/083ea16fbc19d7cd1c16c34180e46a474edfcbf0))
* minimal error handling on the frontend ([42d3f2e](https://github.com/alexx666/clean-arch-todos/commit/42d3f2e1acd7c4a0ea1eeebed24e78046b6c1c53))
* provide list ID on creation ([88b710d](https://github.com/alexx666/clean-arch-todos/commit/88b710d6db60fe237de7bd94ee112f9fc3624a32))
* provide todo ID on creation ([178195a](https://github.com/alexx666/clean-arch-todos/commit/178195a11ecccd5e8e09c22751bb3296d9f4608b))
* **web:** define static web page infra using s3 static web hosting ([24e5b77](https://github.com/alexx666/clean-arch-todos/commit/24e5b7715c02a2a2362d35baa97632c8909965ee)), closes [#5](https://github.com/alexx666/clean-arch-todos/issues/5)


### Bug Fixes

* `tsconfig.json` issues ([133c595](https://github.com/alexx666/clean-arch-todos/commit/133c5959cc8c892aa7e97245f01cb8b10e6441a9))
* **api:** enable datta saving and retreival ([0e9e74e](https://github.com/alexx666/clean-arch-todos/commit/0e9e74eb2f2c79a82d5f178e86427be37beb0a4b))
* **api:** solve CORS errors when running locally ([b1f9a42](https://github.com/alexx666/clean-arch-todos/commit/b1f9a4234d9a52d6f43eaadf1246614637a3fa41)), closes [#6](https://github.com/alexx666/clean-arch-todos/issues/6)
* case errors caught as Error ([9b36246](https://github.com/alexx666/clean-arch-todos/commit/9b36246a37367dac24fe813b6791cc3c9762d576))
* change http status code to 204 for delete ([53c8ffb](https://github.com/alexx666/clean-arch-todos/commit/53c8ffb36e97d71ac0633ef860b520ed072054ad))
* change npm configurations ([251c3e8](https://github.com/alexx666/clean-arch-todos/commit/251c3e84506f2ecc0e0184fe9e81c7611819b02e))
* **cli:** add both http and https support when calling api ([548c6a8](https://github.com/alexx666/clean-arch-todos/commit/548c6a834320a962b23859bab78db7e0456600cc)), closes [#9](https://github.com/alexx666/clean-arch-todos/issues/9)
* **cli:** centralized logging ([0dc56c6](https://github.com/alexx666/clean-arch-todos/commit/0dc56c6e0e409966b9878dccc0853cfd169bd6bf))
* **cli:** pass command details directly into body ([953f2f1](https://github.com/alexx666/clean-arch-todos/commit/953f2f1b3cfaa9c3f8d120189e2121f9298aa97b))
* configure linting and fix errors for api, cli, todos ([5f6e08f](https://github.com/alexx666/clean-arch-todos/commit/5f6e08f13163f581daef955e53eedd21339662b3))
* convert project to scss and ad material style ([0a31ac7](https://github.com/alexx666/clean-arch-todos/commit/0a31ac71a3213ece3bb4c38e3c8408a646fe5e69))
* **core:** add missing definition of generic parameter ([d3ea9fa](https://github.com/alexx666/clean-arch-todos/commit/d3ea9faa5ce6c4e4b24721f83ab4971931357d81))
* dependency issues and security ([602a3a4](https://github.com/alexx666/clean-arch-todos/commit/602a3a47f2b98a44666f3f55e643454c8fa25fd4))
* enable CORS ([3679811](https://github.com/alexx666/clean-arch-todos/commit/367981182940e0f08ca21ff631945bde10286cc1))
* format code using prettier ([7ba2ff1](https://github.com/alexx666/clean-arch-todos/commit/7ba2ff151d99e0c08fcd4732eae4740f865fc891))
* improve routing definition and links generation ([2dc452a](https://github.com/alexx666/clean-arch-todos/commit/2dc452aebccb1718ab832c9c6b76cc786b4097b7))
* inject boundry into individual cmd/router files to make it testable ([99e1013](https://github.com/alexx666/clean-arch-todos/commit/99e1013a84e897005cb3c31826ceb7f9467df45b))
* make listName its PK ([5931d38](https://github.com/alexx666/clean-arch-todos/commit/5931d38c73b480ab3bf5e9954405cf80eeaecb47))
* make lists unique via listName ([ae5a3cf](https://github.com/alexx666/clean-arch-todos/commit/ae5a3cfb9ef9f782d486844f154ea5c1b47c64f2))
* object count after deletion ([3e7a316](https://github.com/alexx666/clean-arch-todos/commit/3e7a31650e10ee548edcef064319624c9d5db539))
* put gateway implementations in corresponding apps folder ([3f502cb](https://github.com/alexx666/clean-arch-todos/commit/3f502cbc5f5a525a55ec6e94b1a73e056f139ab2))
* remove duplicate interfaces ([e60e173](https://github.com/alexx666/clean-arch-todos/commit/e60e173d1617549d6a4f5be31567d3b81d799ed3))
* remove lining issues ([b9d94f8](https://github.com/alexx666/clean-arch-todos/commit/b9d94f8b6b9092b048322bcd277fe2e205383100))
* remove unused export ([8eb21af](https://github.com/alexx666/clean-arch-todos/commit/8eb21af6901f29f3acb683f9b1ec7cc68bd8d6c2))
* rename api package to use scope ([60009cb](https://github.com/alexx666/clean-arch-todos/commit/60009cbc0cd1d0b9fed4b850abedb318cd53ce4b))
* resolve aws dependencies from npm registry ([d8bcf75](https://github.com/alexx666/clean-arch-todos/commit/d8bcf75acc2894eab5a037c6b8f55953cf136130))
* rework tests after refactoring ([0d6e268](https://github.com/alexx666/clean-arch-todos/commit/0d6e268829da057abbcd8897a3ee0c9c59d56357))
* send json error messages ([c955d63](https://github.com/alexx666/clean-arch-todos/commit/c955d6312b8702de88c7f4d5ef50cfb0f9c7687a))
* set glob version for internal libraries ([156f5c0](https://github.com/alexx666/clean-arch-todos/commit/156f5c0fecc9a7d2d1c7390fadc324f465a16fe6))
* simplify creation logic ([02eb935](https://github.com/alexx666/clean-arch-todos/commit/02eb935df610b5337b960cce42becfe96fb3de82))
* tweak tsconfigs so projects are compilable ([859ce56](https://github.com/alexx666/clean-arch-todos/commit/859ce562b487eeaf10f5ca1c04edf34847cba23d))
* update cli command to reflect marker parameter ([22d6e65](https://github.com/alexx666/clean-arch-todos/commit/22d6e6576716696a8a41346b6d29c2a0f31305d5))
* update eslint configuration so it does not hang ([cb0db6c](https://github.com/alexx666/clean-arch-todos/commit/cb0db6c3a07ebf6dd1cb5c4887f134cea6188ebc))
* update lockfile ([0f08c91](https://github.com/alexx666/clean-arch-todos/commit/0f08c913eadc69af6acf739dfcbd5c0f2a6f734c))
* update npm toi version 8 to enable workspaces ([79f059e](https://github.com/alexx666/clean-arch-todos/commit/79f059e7be43e66479ac0c4753b2641c4221d4f9))
* updates TC api call definition ([d632c4e](https://github.com/alexx666/clean-arch-todos/commit/d632c4ea5fe8c87e97e1b809f196e1e8e261fdc5))
* use uuids to identify todos ([d94058b](https://github.com/alexx666/clean-arch-todos/commit/d94058b1fa97661b7f0f2ba753d08792e04c6e7a))
* **web:** prevent form submission on enter ([05680b1](https://github.com/alexx666/clean-arch-todos/commit/05680b1496b4889b776230d0799f80f4b2403918))
* **web:** updatte services and actions after refactor ([98d5885](https://github.com/alexx666/clean-arch-todos/commit/98d588513d027b97282f5c7b2ef9a62f6d5b0cec))
