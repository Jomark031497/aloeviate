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
  elapsed: number;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthState {
  data: IUser | null;
  error: any;
  isLoading: boolean;
}

export interface ITaskState {
  data: ITask[];
  error: any;
  isLoading: boolean;
}

export interface IAuthFormValues {
  username: string;
  password: string;
}

export interface ITaskFormValues {
  name: string;
  duration: number;
}
