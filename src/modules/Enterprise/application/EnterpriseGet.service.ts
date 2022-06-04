import { EnterpriseMongoRepository } from "@Enterprise/infrastructure/persistence/mongo/EnterpriseMongo.repository";
import { Injectable } from "@nestjs/common";
import { EnterpriseGetDto } from "@Enterprise/application/dto/EnterpriseGet.dto";

@Injectable()
export class EnterpriseGetService {
	constructor (
		private readonly enterpriseRepository: EnterpriseMongoRepository
	) {}

	public async run (dto: EnterpriseGetDto) {
		return this.enterpriseRepository.get(dto.enterpriseId);
	}
}