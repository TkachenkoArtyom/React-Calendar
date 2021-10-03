import UsersService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from './../../index';
import {
  AuthActionEnum,
  SetAuthAction,
  SetUserAction,
  SetError,
  SetIsLoadingAction,
} from './types';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
  setIsAuth: (isAuth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: isAuth,
  }),
  setError: (error: string): SetError => ({ type: AuthActionEnum.SET_ERROR, payload: error }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: isLoading,
	}),
	login: (username: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthActionCreators.setIsLoading(true))
			setTimeout(async () => {
				const response = await UsersService.getUsers();
				const mockUser = response.data.find(user => user.username === username && user.password === password)
				if (mockUser) {
					localStorage.setItem('isAuth', 'true')
					localStorage.setItem('username', mockUser.username);
					dispatch(AuthActionCreators.setUser(mockUser));
					dispatch(AuthActionCreators.setIsAuth(true))
				} else {
         dispatch(AuthActionCreators.setError('Некорректный логин или пароль'));
        }
			}, 1000)

		} catch (e) {
      dispatch(AuthActionCreators.setError('Ошибка при логине'));
    }
	},
	logout: () => async (dispatch: AppDispatch) => {
		localStorage.removeItem('isAuth');
		localStorage.removeItem('username')
		dispatch(AuthActionCreators.setUser({} as IUser));			
		dispatch(AuthActionCreators.setIsAuth(false))
		dispatch(AuthActionCreators.setError(''))
	},
};