export interface IUser {
  _id: string;
  username: string;
  password: string;
  tasks?: ITask[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ITask {
  _id: string;
  name: string;
  duration: number;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthState {
  data: IUser | null;
  error: Error | any;
  isLoading: boolean;
}

export interface ITaskState {
  data: ITask[] | null;
  error: Error | any;
  isLoading: boolean;
}

export interface IAuthFormValues {
  username: string;
  password: string;
}
