import { NicknameDecorationsEnum } from "~/api_gen";
import type {
  Loot,
  Subject,
  ChatMessageFull,
  Inventory,
  Reactions,
  AvatarBorder,
} from "~/api_gen";

export type AuthFormNames = "login" | "register" | "restore";

export type Avatar = {
  avatar: string;
  avatar_border: AvatarBorder | null;
};

export type ChatInfoItem = {
  title: string;
  date: string;
  fmtValue: string;
  value: number;
  negative?: boolean;
};

export type Message = {
  id: number;
  message_text: string;
  message_sender: User & {
    can_be_banned: boolean;
    is_content_creator: boolean;
    is_nickname_change_requested: boolean;
    is_moderator: boolean;
    end_ban_date: string | null;
  };
  created_at: string;
  redundant: boolean;
  deleted: string;
  reactions: Reactions[];
};

export type MessageReactionType = {
  message_id: number;
  reaction: string;
  user_id: number;
};

export type MessageWS = {
  id: number;
  message_text: string;
  created_at: string;
  redundant: boolean;
  deleted: string;
  reactions: Reactions[];
  message_sender: {
    id: number;
    avatar: string;
    avatar_border: {
      id: number;
      icon: string;
    };
    can_be_banned: boolean;
    is_content_creator: boolean;
    is_nickname_change_requested: boolean;
    is_moderator: boolean;
    end_ban_date: Date | null;
    nickname: string;
    ban_in_chat: boolean;
    time_end_ban: string | undefined;
    is_active: boolean;
    is_staff: boolean;
    is_verified: boolean;
    selected_nickname_decoration: NicknameDecorationsEnum;
    is_forever_banned: boolean;
  };
};

export type MessageWithMenu = ChatMessageFull & {
  showMenu?: boolean;
  redundant?: boolean;
};

export type Bet = {
  items: number[];
  itemsData: Item[];
  sum: number;
  fee?: number;
  decoration_class?: string;
  user?: User;
};

export type CoinParticipant = Pick<
  User,
  "id" | "nickname" | "avatar" | "selected_nickname_decoration"
> & {
  is_ready: boolean;
  bet: Bet;
};

export type Item = {
  id: number;
  subject: {
    id: number;
    img: string;
    name: string;
    price: number;
    price_gold: number;
    quality_color: string;
  };
};

export type CrashBet = {
  rate: string | number | undefined;
  auto_cash_out: string | number | undefined;
};

export type CrashParticipant = {
  user: Pick<
    User,
    "id" | "balance" | "nickname" | "selected_nickname_decoration"
  >;
} & {
  id: number;
  auto_cash_out: string;
  coef: number | null;
  created_at: string;
  is_won: boolean | null;
  rate: number;
  reward: number;
};

export type RouletteGameData = {
  id: number;
  status: string;
  timer: ReturnType<typeof setTimeout> | undefined;
  bets: Bid[];
  winning_chances: number[];
  config: Record<string, number | undefined>;
  winner: number;
};

export type GameInfo = {
  a: string;
  b: string;
  bets: CrashParticipant[];
  coef: number;
  created_at: string;
  current_time: string;
  finished_at: string | null;
  id: number;
  stage_time_passed: number;
  stage_time_remaining: number | null;
  started_at: string;
  status: string;
  time_before_game: number;
  timer: number;
};

export type ServerEvent = {
  type: string;
  data:
    | {
        coef?: number;
        current_time?: string;
        errors?: string[];
      }
    | GameInfo[];
};

export enum BID_TYPE {
  INVENTORY,
  CURRENCY,
}

export enum ORDERING {
  PRICE_UP = "price",
  PRICE_DOWN = "-price",
  QUALITY_UP = "quality_weight",
  QUALITY_DOWN = "-quality_weight",
}

export type SelectedItem = {
  type: BID_TYPE;
  val: number | null;
  item?: Inventory;
};

export type Reward = SkinBase & {
  id: number;
};

type SubjectType = "skin" | "sticker" | "keychain" | "graffiti" | "case";

export type UserReward = Reward & {
  type: SubjectType;
  collection: number | null;
  tags: Tag[];
};

export type Bid = {
  items: number[];
  itemsData: Item[];
  sum: number;
  decoration_class?: string;
  user?: User;
};

export type SkinBase = {
  img: string;
  name: string;
  stattrack: boolean;
  quality_color: string;
  item_name: string;
  skin_name: string;
  price: number;
};

export enum SkinEnum {
  DEFAULT = "default",
  BULLCOIN = "bullcoin",
  ROULETTE = "roulette",
}

export enum WearEnum {
  FACTORY_NEW = "Factory New",
  MINIMAL_WEAR = "Minimal Wear",
  FIELD_TESTED = "Field-Tested",
  WELL_WORN = "Well-Worn",
  BATTLE_SCARRED = "Battle-Scarred",
}

export type User = UserBase &
  Avatar & {
    email: string;
    balance: number;
    balance_gold: number;
    is_staff: boolean;
    ban_in_chat: boolean;
    active_promo_code: {
      percent: string;
      max_sum_for_bonus: number;
      code: string;
    } | null;
    new_year_percent_top_up: number;
    phone: null | string;
    language: Locales;
    permissions: string[];
    is_bonus_hunter: boolean;
    available_nickname_decorations: ReadonlyArray<string>;
    selected_nickname_decoration: string;
    vk_id: string | null;
  };

export type UserBase = {
  id: number;
  nickname: string;
  selected_nickname_decoration: string;
  top_up_multiplier: string;
};

export type UserShort = UserBase & {
  is_stuff: boolean;
  moderator: boolean;
  ban_in_chat: boolean;
  can_be_banned: boolean;
  is_nickname_change_requested: boolean;
};

export type WheelGameData = {
  id: number;
  status: string;
  timer: number;
  color_won: string;
  parts: WheelParticipant[];
};

export type WheelParticipant = {
  user: User;
  color: string;
  bullcoins: number;
};

export type Article = {
  header: string;
  slug: string;
  text: string;
};

export type BullpassSubject = {
  id: number;
  img: string;
  name: string;
  price: number;
  quality_color: string;
  resourcetype: string;
  stattrack: boolean;
  tags: string[];
  type: string;
};

export type Case = {
  id: number;
  img: string;
  name: string;
  price: number;
  oldPrice: number | null;
  description: string | null;
  subjects: Skin[];
};

export type CaseItem = {
  id: number;
  subject: UserReward;
  dt_added: string;
};

export type Coin = {
  id: number;
  host: User;
  visible_id: number;
  num_participants: number;
  total_sum: number;
};

export type Decoration =
  | "bubble_gum"
  | "sun_beams"
  | "heaven_blue"
  | "lavender"
  | "olive_green"
  | "coral_reef"
  | "topaz"
  | "pacific_gradient"
  | "morning_gradient"
  | "club_gradient"
  | "highest_standard"
  | "admin";

export type Locales = "ru" | "en" | "uz";

export type INotificationOptions = {
  text: string;
  type?: string;
  read?: boolean;
};

export type P2Pdata = {
  cardName: string;
  cardNumber: string;
};

export type PlatformName =
  | "standoff"
  | "genshin"
  | "pubg"
  | "roblox"
  | "cs2"
  | "bgmi";

export type PlatformData = {
  title: string;
  code: PlatformName;
  className: string;
  img: string;
  tg: string;
  insta?: string;
  cypherTapTg: string;
  mainColor: string;
  basePath: "/" | `/${PlatformName}`;
};

export enum PROMO_TYPE {
  PERCENT_ON_BUY = "percent_on_buy",
  FIX = "fix",
  SUBJECT = "subject",
  CASE = "case",
  BATTLE_PASS = "battle_pass",
  TICKETS = "tickets",
  EXCHANGER = "exchanger",
  BOSS_BATTLE_ATTACK_POINTS = "boss_battle_attack_points",
  EMPTY = "empty",
}

export type Skin = Loot | Subject;

export type Socials = "google" | "telegram" | "yandex" | "steam" | "vk";

export type SocialsIndia = "google" | "telegram" | "steam";

export type Tag = {
  id: number;
  tag: string;
};

export type TopUpBalance = {
  type: string;
  url: string;
  method: string;
  fields: Record<string, any>;
  help_text: string;
  action: string;
  card_name?: string;
  card_number?: string;
  qrStr?: string;
};

export type Question = {
  id: number;
  text: string;
  answer: string;
};

export type Faq = {
  name: string;
  questions: Question[];
  slug: string;
  picture: string;
  subTitle: string;
};
