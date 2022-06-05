import { EnterpriseMongoRepository } from "@Enterprise/infrastructure/persistence/mongo/EnterpriseMongo.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EnterpriseGetByApiKeyService {
	constructor (
		private readonly enterpriseRepository: EnterpriseMongoRepository
	) {}

	public async run (dto: { apiKey: string }) {
		return this.enterpriseRepository.getByApiKey(dto.apiKey);
	}
}