// @ts-nocheck
/* eslint-disable */
import lodash from "lodash";
import { AffiseApi } from './AffiseApi'
import { ArticlesApi } from './ArticlesApi'
import { AuthApi } from './AuthApi'
import { AvatarsApi } from './AvatarsApi'
import { BattlePassApi } from './BattlePassApi'
import { CasesApi } from './CasesApi'
import { ChatApi } from './ChatApi'
import { ContactsApi } from './ContactsApi'
import { DocsApi } from './DocsApi'
import { EventsApi } from './EventsApi'
import { FaqApi } from './FaqApi'
import { GamesApi } from './GamesApi'
import { MarketingBotApi } from './MarketingBotApi'
import { PaymentsApi } from './PaymentsApi'
import { PromoCodesApi } from './PromoCodesApi'
import { PushApi } from './PushApi'
import { QuestsApi } from './QuestsApi'
import { ReferralApi } from './ReferralApi'
import { RewardsApi } from './RewardsApi'
import { SocialApi } from './SocialApi'
import { TranslationsApi } from './TranslationsApi'
import { UserApi } from './UserApi'
import { WithdrawalsApi } from './WithdrawalsApi'
import { Configuration } from '../runtime'

const { bindAll, isFunction } = lodash;
const DefaultConfig = new Configuration()

export class Api {
    protected configuration: Configuration;
    public affise: AffiseApi
    public articles: ArticlesApi
    public auth: AuthApi
    public avatars: AvatarsApi
    public battlePass: BattlePassApi
    public cases: CasesApi
    public chat: ChatApi
    public contacts: ContactsApi
    public docs: DocsApi
    public events: EventsApi
    public faq: FaqApi
    public games: GamesApi
    public marketingBot: MarketingBotApi
    public payments: PaymentsApi
    public promoCodes: PromoCodesApi
    public push: PushApi
    public quests: QuestsApi
    public referral: ReferralApi
    public rewards: RewardsApi
    public social: SocialApi
    public translations: TranslationsApi
    public user: UserApi
    public withdrawals: WithdrawalsApi

    constructor() {
        this.configuration = this.getConfig();
        this.affise = bindAllMethods(new AffiseApi(this.configuration))
        this.articles = bindAllMethods(new ArticlesApi(this.configuration))
        this.auth = bindAllMethods(new AuthApi(this.configuration))
        this.avatars = bindAllMethods(new AvatarsApi(this.configuration))
        this.battlePass = bindAllMethods(new BattlePassApi(this.configuration))
        this.cases = bindAllMethods(new CasesApi(this.configuration))
        this.chat = bindAllMethods(new ChatApi(this.configuration))
        this.contacts = bindAllMethods(new ContactsApi(this.configuration))
        this.docs = bindAllMethods(new DocsApi(this.configuration))
        this.events = bindAllMethods(new EventsApi(this.configuration))
        this.faq = bindAllMethods(new FaqApi(this.configuration))
        this.games = bindAllMethods(new GamesApi(this.configuration))
        this.marketingBot = bindAllMethods(new MarketingBotApi(this.configuration))
        this.payments = bindAllMethods(new PaymentsApi(this.configuration))
        this.promoCodes = bindAllMethods(new PromoCodesApi(this.configuration))
        this.push = bindAllMethods(new PushApi(this.configuration))
        this.quests = bindAllMethods(new QuestsApi(this.configuration))
        this.referral = bindAllMethods(new ReferralApi(this.configuration))
        this.rewards = bindAllMethods(new RewardsApi(this.configuration))
        this.social = bindAllMethods(new SocialApi(this.configuration))
        this.translations = bindAllMethods(new TranslationsApi(this.configuration))
        this.user = bindAllMethods(new UserApi(this.configuration))
        this.withdrawals = bindAllMethods(new WithdrawalsApi(this.configuration))
    }

    protected getConfig() {
      return new Configuration();
    }
}

function bindAllMethods(obj: any) {
  return bindAll(
    obj,
    Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(key => isFunction(obj[key])),
  )
}
