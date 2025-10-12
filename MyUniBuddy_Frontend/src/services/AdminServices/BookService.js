// services/AdminServices/BookService.ts
import { apiConfig } from "../../config/apiConfig";
import httpClient from "../../config/httpClient";

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Build FormData for create/update with files
const buildBookFormData = (book, coverImage, bookPdf) => {
  const fd = new FormData();
  // text fields—must match backend [FromForm] names
  fd.append("Title", book.title ?? "");
  fd.append("Author", book.author ?? "");
  fd.append("ISBN", book.isbn ?? "");
  fd.append("Category", book.category ?? "");
  fd.append("SubCategory", book.subCategory ?? "");
  fd.append("NumberOfCopies", String(book.numberOfCopies ?? 0));
  fd.append("Location", book.location ?? "");
  fd.append("Description", book.description ?? "");

  // files—must match backend parameter names: ThumbnailImage, PdfFile
  if (coverImage) fd.append("ThumbnailImage", coverImage);
  if (bookPdf) fd.append("PdfFile", bookPdf);
  return fd;
};

const BookService = {
  getBooks: async () => handleRequest(httpClient.get(apiConfig.Book.getAll)),
  createBook: async (BookData) => handleRequest(httpClient.post(apiConfig.Book.create, BookData)),         // JSON only
  createBookWithFiles: async (book, coverImage, bookPdf) =>
    handleRequest(
      httpClient.post(apiConfig.Book.createWithFiles, buildBookFormData(book, coverImage, bookPdf), {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  getBookById: async (BookID) => handleRequest(httpClient.get(apiConfig.Book.getById(BookID))),
  updateBook: async (BookId, updatedData) => handleRequest(httpClient.put(apiConfig.Book.update(BookId), updatedData)), // JSON only
  updateBookWithFiles: async (BookId, book, coverImage, bookPdf) =>
    handleRequest(
      httpClient.put(apiConfig.Book.updateWithFiles(BookId), buildBookFormData(book, coverImage, bookPdf), {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ),
  deleteBookById: async (BookID) => handleRequest(httpClient.delete(apiConfig.Book.delete(BookID))),
};

export default BookService;
