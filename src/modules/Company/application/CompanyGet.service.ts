import { CompanyMongoRepository } from "@Company/infrastructure/persistence/mongo/CompanyMongo.repository";
import { Injectable } from "@nestjs/common";
import { CompanyGetDto } from "./CompanyGet.dto";

@Injectable()
export class CompanyGetService {
	constructor (
		private readonly companyRepository: CompanyMongoRepository
	) {}

	public async run (dto: CompanyGetDto) {
		return this.companyRepository.get(dto.companyId);
	}
}