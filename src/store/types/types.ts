import {IAuthor} from "../../types/IAuthor";
import {IBook} from "../../types/IBook";

type LibraryStore = {
    authors: IAuthor[],
    books: IBook[],
}

type AuthorDetails = {
    author: IAuthor,
    index: number
}

type BookDetails = {
    book: IBook,
    index: number
}
export type {LibraryStore, AuthorDetails, BookDetails};
