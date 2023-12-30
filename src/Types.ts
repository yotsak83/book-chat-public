export interface InitialUserState {
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

export interface InitialBookState {
  bookId: string | null;
  bookName: string | null;
}
