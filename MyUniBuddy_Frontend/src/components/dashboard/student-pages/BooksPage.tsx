import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BookService from "../../../services/AdminServices/BookService";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  BookOpen,
  Star,
  Download,
  Eye,
  Filter,
  BookMarked,
  Clock,
  Users,
  Plus,
  Trash2,
  FileText
} from "lucide-react";
import { config } from "../../../config/config";

// ---- helper: turn /uploads/... into absolute URL (no /api) ----
const fileUrl = (path?: string | null) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${config.DocbaseUrl}${path}`;
};

// --- types from your backend ---
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
  thumbnailImageUrl?: string | null;
  pdfUrl?: string | null;
};

// --- the UI's "featured" shape (we'll map real books into this) ---
type FeaturedShape = {
  id: string | number;
  title: string;
  author: string;
  category: string;
  rating: number;
  downloads: number;
  description: string;
  cover: string;
  available: boolean;
  type: "PDF" | "Book";
  pdfUrl?: string;
  pages: number;
  publishedYear: number;
};

const featuredBooks: FeaturedShape[] = []; // no longer used as data source; we keep UI intact

const recentlyViewed = [
  { title: "Data Structures and Algorithms", progress: 45, lastRead: "2 hours ago" },
  { title: "Software Engineering Principles", progress: 78, lastRead: "1 day ago" },
  { title: "Computer Networks", progress: 23, lastRead: "3 days ago" }
];

const categoriesSeed = [
  "All", "Computer Science", "Mathematics", "Software Engineering",
  "Database", "AI/ML", "Web Development", "Mobile Development"
];

export const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [myLibrary, setMyLibrary] = useState<number[]>([]);
  const [selectedBook, setSelectedBook] = useState<FeaturedShape | null>(null);
  const [showMyLibrary, setShowMyLibrary] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [books, setBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState(true);

  // ---------- fetch from API ----------
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

  // ---------- map API books to the UI's "featured" shape (no UI change) ----------
  const mappedBooks: FeaturedShape[] = useMemo(() => {
    return (books || []).map((b, idx) => {
      const copies = b.numberOfCopies || 0;
      const borrowed = b.borrowed || 0;
      const availableByStock = copies - borrowed > 0;
      const hasPdf = !!b.pdfUrl;

      return {
        id: b.id || idx, // safe fallback
        title: b.title,
        author: b.author,
        category: b.category || "General",
        rating: 0, // backend doesn’t supply rating; keep UI unchanged with default
        downloads: 0, // backend doesn’t supply downloads; default
        description: b.description || "",
        cover: b.thumbnailImageUrl ? fileUrl(b.thumbnailImageUrl) : "",
        available: hasPdf || availableByStock, // if there’s a PDF, treat as available to open
        type: hasPdf ? "PDF" : "Book",
        pdfUrl: hasPdf ? fileUrl(b.pdfUrl!) : undefined,
        pages: 0, // backend doesn’t supply pages; default
        publishedYear: new Date().getFullYear(), // default; UI badge needs a number
      };
    });
  }, [books]);

  // ---------- filter + search (keeps your UI) ----------
  const categories = useMemo(() => {
    const dyn = new Set<string>();
    mappedBooks.forEach(m => m.category && dyn.add(m.category));
    return ["All", ...Array.from(dyn.size ? dyn : new Set(categoriesSeed.slice(1)))];
  }, [mappedBooks]);

  const displayBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return mappedBooks.filter(m => {
      const matchesQ =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);

      const matchesCat = selectedCategory === "All" || m.category === selectedCategory;

      return matchesQ && matchesCat;
    });
  }, [mappedBooks, searchQuery, selectedCategory]);

  // ---------- existing UI handlers (kept) ----------
  const addToLibrary = (bookId: number) => {
    if (!myLibrary.includes(bookId)) {
      setMyLibrary([...myLibrary, bookId]);
      toast({
        title: "Added to Library",
        description: "Book has been added to your library.",
      });
    }
  };

  const removeFromLibrary = (bookId: number) => {
    setMyLibrary(myLibrary.filter(id => id !== bookId));
    toast({
      title: "Removed from Library",
      description: "Book has been removed from your library.",
    });
  };

  // use same function name, but if pdf exists, actually open it
  const downloadBook = (book: FeaturedShape) => {
    toast({
      title: "Downloading...",
      description: `Downloading ${book.title}`,
    });

    if (book.pdfUrl) {
      // open PDF immediately in new tab
      window.open(book.pdfUrl, "_blank", "noopener,noreferrer");
    }

    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${book.title} has been downloaded.`,
      });
    }, 800);
  };

  const libraryBooks = displayBooks.filter(book => myLibrary.includes(Number(book.id)));

  // ---------- loading / error states ----------
  if (loading) return <div className="text-center py-10">Loading books...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            {showMyLibrary ? "My Library" : "Academic Library"}
          </h1>
          <p className="text-muted-foreground">
            {showMyLibrary
              ? `You have ${libraryBooks.length} book${libraryBooks.length !== 1 ? 's' : ''} in your library`
              : "Discover books and resources for your studies"
            }
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => setShowMyLibrary(!showMyLibrary)}
        >
          <BookMarked className="w-4 h-4 mr-2" />
          {showMyLibrary ? "Browse Books" : `My Library (${libraryBooks.length})`}
        </Button>
      </div>

      {/* Search and Filter */}
      {!showMyLibrary && (
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search books, authors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showMyLibrary ? (
        // My Library (unchanged UI; uses mapped list)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryBooks.length === 0 ? (
            <Card className="col-span-full p-12 text-center">
              <BookMarked className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Your library is empty</h3>
              <p className="text-muted-foreground mb-4">Start adding books to build your collection</p>
              <Button onClick={() => setShowMyLibrary(false)}>
                Browse Books
              </Button>
            </Card>
          ) : (
            libraryBooks.map((book) => (
              <Card key={book.id} className="feature-card overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                    {book.cover ? (
                      <img
                        src={book.cover}
                        alt={`${book.title} cover`}
                        className="h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://via.placeholder.com/120x160?text=No+Image";
                        }}
                      />
                    ) : (
                      <BookOpen className="w-16 h-16 text-primary/50" />
                    )}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{book.description}</p>

                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{book.pages} pages</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelectedBook(book)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadBook(book)}
                      disabled={!book.pdfUrl}
                      title={book.pdfUrl ? "Open PDF" : "No PDF"}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromLibrary(Number(book.id))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : (
        // Featured tab now shows REAL books (same UI)
        <Tabs defaultValue="featured" className="space-y-6">
          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayBooks.map((book) => (
                <Card key={book.id} className="feature-card overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={`${book.title} cover`}
                          className="h-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "https://via.placeholder.com/120x160?text=No+Image";
                          }}
                        />
                      ) : (
                        <BookOpen className="w-16 h-16 text-primary/50" />
                      )}
                    </div>
                    {!book.available && (
                      <Badge variant="secondary" className="absolute top-2 right-2">
                        Not Available
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{book.description}</p>

                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{book.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{book.downloads}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={!book.available}
                        onClick={() => setSelectedBook(book)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!book.pdfUrl}
                        onClick={() => downloadBook(book)}
                        title={book.pdfUrl ? "Open PDF" : "No PDF"}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      {myLibrary.includes(Number(book.id)) ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => removeFromLibrary(Number(book.id))}
                        >
                          <BookMarked className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={!book.available}
                          onClick={() => addToLibrary(Number(book.id))}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Book Details Dialog (unchanged UI; shows mapped values) */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="w-32 h-44 bg-gradient-to-br from-primary/10 to-accent/10 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {selectedBook.cover ? (
                    <img
                      src={selectedBook.cover}
                      alt={`${selectedBook.title} cover`}
                      className="h-full object-contain"
                    />
                  ) : (
                    <BookOpen className="w-12 h-12 text-primary/50" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
                  <p className="text-muted-foreground mb-4">by {selectedBook.author}</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge variant="secondary">{selectedBook.category}</Badge>
                    <Badge variant="outline">{selectedBook.type}</Badge>
                    <Badge variant="outline">{selectedBook.publishedYear}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedBook.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>{selectedBook.downloads} Downloads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{selectedBook.pages} Pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookMarked className="w-4 h-4" />
                      <span>{selectedBook.available ? "Available" : "Not Available"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedBook.description}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  disabled={!selectedBook.pdfUrl}
                  onClick={() => downloadBook(selectedBook)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {selectedBook.pdfUrl ? "Download PDF" : "No PDF"}
                </Button>
                {/* My Library buttons kept as-is */}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};












   {/* <TabsList>
          <TabsTrigger value="featured">Featured Books</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList> */}




          {/* <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Continue Reading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentlyViewed.map((book, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">{book.lastRead}</p>
                    <div className="mt-2 bg-background rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{book.progress}% complete</p>
                  </div>
                  <Button size="sm">Continue</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent> */}

          {/* <TabsContent value="recommended" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Based on Your Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredBooks.slice(0, 2).map((book) => (
                  <div key={book.id} className="flex gap-4 p-4 bg-accent/10 rounded-lg">
                    <div className="w-16 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary/50" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{book.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{book.rating}</span>
                        <Badge variant="outline">{book.category}</Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}