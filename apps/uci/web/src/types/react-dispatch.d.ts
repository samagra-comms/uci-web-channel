import { User } from "../types"

export type setUsers = React.Dispatch<React.SetStateAction<User[]>>;
export type setCurrentUser = React.Dispatch<React.SetStateAction<User>>;
export type setLoading = React.Dispatch<React.SetStateAction<boolean>>;
export type setSelected = React.Dispatch<React.SetStateAction<boolean>>;