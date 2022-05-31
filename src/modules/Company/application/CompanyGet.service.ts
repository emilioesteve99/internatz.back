import { CompanyNotFoundException } from "@Company/domain/exception/CompanyNotFound.exception";
import { CompanyMongoRepository } from "@Company/infrastructure/persistence/mongo/CompanyMongo.repository";
import { Injectable } from "@nestjs/common";
import { CacheService } from "@Shared/cache/Cache.service";
import { Company } from "@Shared/entity/Company";
import { getEnv } from "@Shared/environment/GetEnv";

@Injectable()
export class CompanyGetService {
	private readonly cacheKey: string = 'internatz:company';
	private readonly reloadInterval: number = 
		getEnv<number>('companiesReloadInterval') ?? 60000;
	private readonly cacheTtl: number =
		getEnv<number>('companiesCacheTTL') ?? 120000;
	private companies: {[companyId: string]: Company} = {};

	constructor (
		private readonly cacheService: CacheService,
		private readonly companyRepository: CompanyMongoRepository,
	) {}

	public async get (companyId: string) {
		const company = this.companies[companyId];
		if (!company) throw new CompanyNotFoundException(companyId);
		return company;
	}

	public async init () {
		await this.load();
		setInterval(async () => {
			await this.load();
		}, this.reloadInterval);
	}

	private async load () {
		const cachedCompanies = await this.cacheService.get(this.cacheKey);
		if (cachedCompanies && Object.keys(cachedCompanies).length >= 1) {
			this.companies = cachedCompanies;
			return;
		}
		const companies = await this.companyRepository.getAll();
		const companiesById = {};
		for (const company of companies) companiesById[company._id] = company;
		await this.cacheService.set(this.cacheKey, JSON.stringify(this.companies), this.cacheTtl);
		this.companies = companiesById;
	}
}