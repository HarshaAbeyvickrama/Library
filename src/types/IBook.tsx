import {IAuthor} from "./IAuthor";

export interface IBook {
    title: string,
    ISBN: string,
    author: IAuthor
}
