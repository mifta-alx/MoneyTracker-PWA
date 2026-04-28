export interface AccountData {
  name: string;
  type: string;
  balance: number;
  color: string;
  icon: string;
  is_excluded: boolean;
}
export interface AccountItem extends AccountData {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface AccountsResponseData {
  total_balance: number;
  accounts: AccountItem[];
}