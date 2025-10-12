import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Book as BookIcon, Search, Plus, Edit, Trash2, Eye, Users, Upload, Image as ImageIcon } from "lucide-react";
import BookService from "../../../services/AdminServices/BookService";
import { useToast } from "@/components/ui/use-toast";
import { config } from "../../../config/config"
// Helper function for debouncing
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: any;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

type BookModel = {
  id?: string;
  title: string;
  author: string;
  isbn?: string;
  category?: string;
  subCategory?: string;
  numberOfCopies: number;
  location: string;
  description?: string;
  borrowed?: number;
  // Backend returns these when present:
  thumbnailImageUrl?: string | null;
  pdfUrl?: string | null;
};

export function BooksManagementPage() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookModel | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [bookPdf, setBookPdf] = useState<File | null>(null);
const toAbsoluteUrl = (path?: string | null) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${config.DocbaseUrl}${path}`;
};
  const [newBook, setNewBook] = useState<BookModel>({
    title: "",
    author: "",
    isbn: "",
    category: "",
    numberOfCopies: 0,
    location: "",
    description: "",
    subCategory: "",
  });

  const { toast } = useToast();

  // When opening the Edit dialog, show the current cover if no new file selected
  useEffect(() => {
    if (isEditDialogOpen && selectedBook) {
      if (!coverImage && selectedBook.thumbnailImageUrl) {
        setCoverImagePreview(selectedBook.thumbnailImageUrl);
      }
    } else {
      // reset when closing
      setCoverImage(null);
      setCoverImagePreview("");
      setBookPdf(null);
    }
  }, [isEditDialogOpen, selectedBook]);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setBookPdf(file);
    }
  };

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await BookService.getBooks();
      setBooks(data || []);
    } catch (err) {
      setError("Failed to fetch books.");
      toast({
        title: "Error",
        description: "Failed to fetch books from the server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Add (uses files if provided)
  const handleCreateBook = async () => {
    setSubmitting(true);
    try {
      await BookService.createBookWithFiles(newBook, coverImage, bookPdf);
      toast({ title: "Success", description: "Book added successfully!" });
      setIsAddDialogOpen(false);
      setNewBook({ title: "", author: "", isbn: "", category: "", numberOfCopies: 0, location: "", description: "", subCategory: "" });
      setCoverImage(null);
      setCoverImagePreview("");
      setBookPdf(null);
      fetchBooks();
    } catch {
      toast({ title: "Error", description: "Failed to add book.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  // Edit (keeps existing files if you don't select new ones)
  const handleUpdateBook = async () => {
    if (!selectedBook) return;
    setSubmitting(true);
    try {
      await BookService.updateBookWithFiles(selectedBook.id!, selectedBook, coverImage, bookPdf);
      toast({ title: "Success", description: "Book updated successfully!" });
      setIsEditDialogOpen(false);
      setCoverImage(null);
      setCoverImagePreview("");
      setBookPdf(null);
      fetchBooks();
    } catch {
      toast({ title: "Error", description: "Failed to update book.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await BookService.deleteBookById(bookId);
      toast({ title: "Success", description: "Book deleted successfully!" });
      fetchBooks();
    } catch {
      toast({ title: "Error", description: "Failed to delete book.", variant: "destructive" });
    }
  };

  const handleSearchChange = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  // Safer distincts
  const categories = [...new Set(books.map((b) => b.category).filter(Boolean))] as string[];
  const subCategories = [
    ...new Set(
      books
        .filter((b) => selectedCategory === "all" || b.category === selectedCategory)
        .map((b) => b.subCategory)
        .filter(Boolean)
    ),
  ] as string[];

  const totalBooks = books.length;
  const totalCopies = books.reduce((sum, book) => sum + (book.numberOfCopies || 0), 0);
  const totalBorrowed = books.reduce((sum, book) => sum + (book.borrowed || 0), 0);
  const totalAvailable = totalCopies - totalBorrowed;

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subCategory?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === "all" || book.subCategory === selectedSubCategory;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  const getStatus = (book: BookModel) => {
    if (!book.numberOfCopies || book.numberOfCopies === 0) return "Out of Stock";
    if ((book.numberOfCopies - (book.borrowed || 0)) <= 3) return "Limited";
    return "Available";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "Limited":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "Out of Stock":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  if (loading) return <div className="text-center py-10">Loading books...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Books & Library Management 📚</h1>
          <p className="text-muted-foreground">Manage library collections and book inventory</p>
        </div>

        {/* ADD */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>Enter book details to add to the library collection</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Book title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder="Author name" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" placeholder="ISBN number" value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newBook.category} onValueChange={(value) => setNewBook({ ...newBook, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subCategory">SubCategory</Label>
                <Input id="subCategory" placeholder="e.g., Ethics" value={newBook.subCategory} onChange={(e) => setNewBook({ ...newBook, subCategory: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numberOfCopies">Number of Copies</Label>
                <Input
                  id="numberOfCopies"
                  type="number"
                  placeholder="0"
                  value={newBook.numberOfCopies}
                  onChange={(e) => setNewBook({ ...newBook, numberOfCopies: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Section A-1" value={newBook.location} onChange={(e) => setNewBook({ ...newBook, location: e.target.value })} />
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="coverImage">Book Cover Image</Label>
                <div className="flex flex-col gap-2">
                  <label htmlFor="coverImage" className="cursor-pointer">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                      {coverImagePreview ? (
                        <img src={coverImagePreview} alt="Cover preview" className="h-full object-contain rounded-lg" />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to upload cover</span>
                        </div>
                      )}
                    </div>
                  </label>
                  <Input id="coverImage" type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
                  {coverImage && <p className="text-xs text-muted-foreground">{coverImage.name}</p>}
                </div>
              </div>

              {/* PDF Upload */}
              <div className="space-y-2">
                <Label htmlFor="bookPdf">Book PDF File</Label>
                <div className="flex flex-col gap-2">
                  <label htmlFor="bookPdf" className="cursor-pointer">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                      {bookPdf ? (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-green-600 mb-2" />
                          <span className="text-sm font-medium">{bookPdf.name}</span>
                          <p className="text-xs text-muted-foreground mt-1">{(bookPdf.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to upload PDF</span>
                        </div>
                      )}
                    </div>
                  </label>
                  <Input id="bookPdf" type="file" accept="application/pdf" onChange={handlePdfChange} className="hidden" />
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Book description" value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button onClick={handleCreateBook} disabled={submitting}>
                {submitting ? "Saving..." : "Add Book"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Copies</CardTitle>
            <Badge className="bg-green-500/10 text-green-700">Available</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAvailable}</div>
            <p className="text-xs text-muted-foreground">{totalCopies ? ((totalAvailable / totalCopies) * 100).toFixed(1) : "0.0"}% of total copies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Borrowed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBorrowed}</div>
            <p className="text-xs text-muted-foreground">{totalCopies ? ((totalBorrowed / totalCopies) * 100).toFixed(1) : "0.0"}% of total copies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Badge variant="outline">{categories.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">Active categories</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Search and Filters --- */}
      <Card>
        <CardHeader>
          <CardTitle>Library Collection</CardTitle>
          <CardDescription>Search and manage all books in the library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search books by title, author, or ISBN..." onChange={(e) => handleSearchChange(e.target.value)} className="pl-9" />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedSubCategory("all"); // Reset subcategory when category changes
              }}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subcategories</SelectItem>
                {subCategories.map((subCat) => (
                  <SelectItem key={subCat} value={subCat}>
                    {subCat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Details</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SubCategory</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {/* Thumbnail */}
                          {book.thumbnailImageUrl ? (
                            <img
                               src={toAbsoluteUrl(book.thumbnailImageUrl)}
                              alt={`${book.title} cover`}
                              className="h-12 w-10 object-cover rounded border"
                            />
                          ) : (
                            <div className="h-12 w-10 rounded border flex items-center justify-center text-[10px] text-muted-foreground">
                              No image
                            </div>
                          )}

                          <div>
                            <div className="font-medium">{book.title}</div>
                            <div className="text-sm text-muted-foreground">by {book.author}</div>
                            <div className="text-xs text-muted-foreground">ISBN: {book.isbn || "—"}</div>

                            {/* PDF link */}
                            {book.pdfUrl && (
                              <a
                                href={toAbsoluteUrl(book.pdfUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs underline mt-1 inline-flex items-center gap-1"
                              >
                                <Upload className="h-3 w-3" />
                                Open PDF
                              </a>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline">{book.category || "—"}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{book.subCategory || "—"}</Badge>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">
                          <div>
                            {(book.numberOfCopies || 0) - (book.borrowed || 0)}/{book.numberOfCopies || 0} available
                          </div>
                          <div className="text-muted-foreground">{book.borrowed || 0} borrowed</div>
                          <Badge className={`mt-1 ${getStatusColor(getStatus(book))}`}>{getStatus(book)}</Badge>
                        </div>
                      </TableCell>

                      <TableCell>{book.location}</TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedBook(book);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedBook(book);
                              setIsEditDialogOpen(true);
                              setCoverImage(null);
                              setBookPdf(null);
                              setCoverImagePreview(book.thumbnailImageUrl || "");
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          <Button size="sm" variant="ghost" onClick={() => handleDeleteBook(book.id!)} className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No books found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- Edit Book Dialog --- */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Update the details of this book.</DialogDescription>
          </DialogHeader>

          {selectedBook && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input id="edit-title" value={selectedBook.title} onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-author">Author</Label>
                <Input id="edit-author" value={selectedBook.author} onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-isbn">ISBN</Label>
                <Input id="edit-isbn" value={selectedBook.isbn} onChange={(e) => setSelectedBook({ ...selectedBook, isbn: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select value={selectedBook.category} onValueChange={(value) => setSelectedBook({ ...selectedBook, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subCategory">SubCategory</Label>
                <Input id="edit-subCategory" value={selectedBook.subCategory} onChange={(e) => setSelectedBook({ ...selectedBook, subCategory: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-copies">Number of Copies</Label>
                <Input
                  id="edit-copies"
                  type="number"
                  value={selectedBook.numberOfCopies}
                  onChange={(e) => setSelectedBook({ ...selectedBook, numberOfCopies: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input id="edit-location" value={selectedBook.location} onChange={(e) => setSelectedBook({ ...selectedBook, location: e.target.value })} />
              </div>

              {/* Edit: Cover Image */}
              <div className="space-y-2">
                <Label htmlFor="edit-coverImage">Book Cover Image</Label>
                <div className="flex flex-col gap-2">
                  <label htmlFor="edit-coverImage" className="cursor-pointer">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                      {coverImagePreview || selectedBook.thumbnailImageUrl ? (
                        <img
                          src={coverImagePreview || selectedBook.thumbnailImageUrl || ""}
                          alt="Cover preview"
                          className="h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to upload cover</span>
                        </div>
                      )}
                    </div>
                  </label>
                  <Input id="edit-coverImage" type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
                  {coverImage && <p className="text-xs text-muted-foreground">{coverImage.name}</p>}
                </div>
              </div>

              {/* Edit: PDF */}
              <div className="space-y-2">
                <Label htmlFor="edit-bookPdf">Book PDF File</Label>
                <div className="flex flex-col gap-2">
                  <label htmlFor="edit-bookPdf" className="cursor-pointer">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
                      {bookPdf ? (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 mb-2" />
                          <span className="text-sm font-medium">{bookPdf.name}</span>
                          <p className="text-xs text-muted-foreground mt-1">{(bookPdf.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : selectedBook.pdfUrl ? (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 mb-2" />
                          <a href={selectedBook.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                            Open current PDF
                          </a>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Click to upload PDF</span>
                        </div>
                      )}
                    </div>
                  </label>
                  <Input id="edit-bookPdf" type="file" accept="application/pdf" onChange={handlePdfChange} className="hidden" />
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" value={selectedBook.description} onChange={(e) => setSelectedBook({ ...selectedBook, description: e.target.value })} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleUpdateBook} disabled={submitting}>
              {submitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- View Book Dialog --- */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <div className="space-y-4">
              {selectedBook.thumbnailImageUrl && (
                <div>
                  <Label>Cover</Label>
                  <img src={selectedBook.thumbnailImageUrl} alt="Book cover" className="h-48 w-auto rounded border mt-1" />
                </div>
              )}

              <div>
                <Label>Title</Label>
                <div className="font-semibold">{selectedBook.title}</div>
              </div>
              <div>
                <Label>Author</Label>
                <div>{selectedBook.author}</div>
              </div>
              <div>
                <Label>ISBN</Label>
                <div>{selectedBook.isbn || "—"}</div>
              </div>
              <div>
                <Label>Category</Label>
                <Badge variant="outline">{selectedBook.category || "—"}</Badge>
              </div>
              <div>
                <Label>SubCategory</Label>
                <Badge variant="secondary">{selectedBook.subCategory || "—"}</Badge>
              </div>
              <div>
                <Label>Status</Label>
                <Badge className={getStatusColor(getStatus(selectedBook))}>{getStatus(selectedBook)}</Badge>
              </div>
              <div>
                <Label>Availability</Label>
                <div>
                  {(selectedBook.numberOfCopies || 0) - (selectedBook.borrowed || 0)} out of {selectedBook.numberOfCopies || 0} copies available
                </div>
              </div>
              <div>
                <Label>Location</Label>
                <div>{selectedBook.location}</div>
              </div>
              <div>
                <Label>Description</Label>
                <div className="text-sm text-muted-foreground">{selectedBook.description || "—"}</div>
              </div>

              {selectedBook.pdfUrl && (
                <div>
                  <Label>PDF</Label>
                  <div>
                    <a href={selectedBook.pdfUrl} target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Open Book PDF
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
