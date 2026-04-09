export interface AccountData {
  name: string;
  type: string;
  balance: number;
  color: string;
  icon: string;
}
export interface AccountItem {
  id: string;
  name: string;
  type: string;
  balance: number;
  color: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface AccountsResponseData {
  total_balance: number;
  accounts: AccountItem[];
}