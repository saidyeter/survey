import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getLocaleDate(ms: Date | undefined) {
  return ms?.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // dateStyle:'long'
  });
}

export function createPagingSearchQuery(
  pageSize?: number,
  pageNumber?: number,
  search?: string,
  orderColumn?: string,
  orderDirection?: string,
  id?: number) {

  const params = new URLSearchParams();

  if (id) { params.append("id", id.toString()) }
  if (pageSize) { params.append("s", pageSize.toString()) }
  if (pageNumber) { params.append("n", pageNumber.toString()) }
  if (search) { params.append("q", search.toString()) }
  if (orderColumn) { params.append("oc", orderColumn.toString()) }
  if (orderDirection) { params.append("od", orderDirection.toString()) }

  return '?' + params.toString()
}

export function getIdParams(searchParams: { [key: string]: string | string[] | undefined }) {
  const _id = searchParams.id;

  let id: number | undefined = 5;


  if (_id && typeof _id === 'string') {
    id = parseInt(_id)
    if (id.toString() != _id) {
      id = undefined
    }
  }

  return id
}

export function getPagingParams(searchParams: { [key: string]: string | string[] | undefined }) {
  const _pageSize = searchParams.s;
  const _pageNumber = searchParams.n;
  const _search = searchParams.q;
  const _orderColumn = searchParams.oc
  const _orderDirection = searchParams.od

  let pageSize = 5;
  let pageNumber = 0;
  let search = '';
  let orderColumn = 'title';
  let orderDirection = 'a';


  if (_pageSize && typeof _pageSize === 'string') {
    pageSize = parseInt(_pageSize)
    if (pageSize.toString() != _pageSize) {
      pageSize = 5
    }
  }

  if (_pageNumber && typeof _pageNumber === 'string') {
    pageNumber = parseInt(_pageNumber)
    if (pageNumber.toString() != _pageNumber) {
      pageNumber = 1
    }
  }
  if (_search && typeof _search === 'string') {
    search = _search
  }
  if (_orderColumn && typeof _orderColumn === 'string') {
    orderColumn = _orderColumn
  }
  if (_orderDirection && typeof _orderDirection === 'string') {
    orderDirection = _orderDirection
    if (
      orderDirection !== "d" &&
      orderDirection !== "desc" &&
      orderDirection !== "descending") {
      orderDirection = "a"
    }
    else {
      orderDirection = "d"
    }
  }

  return {
    pageNumber,
    pageSize,
    search,
    orderDirection,
    orderColumn
  }
}