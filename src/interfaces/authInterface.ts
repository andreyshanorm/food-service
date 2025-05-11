export interface LoginResponce {
    access_token: string
}

export interface getProfileResponce {
	id: number,
    email: string,
    passwordHash?: string,
    adress: string,
    name: string,
    restoreToken: null,
    phone: string
}
