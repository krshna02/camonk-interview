import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, X, Calendar, ArrowLeft } from 'lucide-react';

// Types
interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

interface CreateBlogDto {
  title: string;
  category: string[];
  description: string;
  coverImage: string;
  content: string;
}

// API Functions
const API_URL = 'http://localhost:3001';

const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${API_URL}/blogs`);
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

const fetchBlogById = async (id: number): Promise<Blog> => {
  const response = await fetch(`${API_URL}/blogs/${id}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
};

const createBlog = async (blog: CreateBlogDto): Promise<Blog> => {
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...blog,
      date: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error('Failed to create blog');
  return response.json();
};

// Blog List Component
const BlogList: React.FC<{ 
  onSelectBlog: (id: number) => void; 
  selectedBlogId: number | null;
  refreshTrigger: number;
}> = ({ onSelectBlog, selectedBlogId, refreshTrigger }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blogs');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="cursor-pointer">
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error loading blogs. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedBlogId === blog.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onSelectBlog(blog.id)}
        >
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              {blog.category.map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-lg">{blog.title}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              <Calendar className="w-3 h-3" />
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 line-clamp-3">{blog.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Blog Detail Component
const BlogDetail: React.FC<{ blogId: number; onBack: () => void }> = ({ blogId, onBack }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchBlogById(blogId);
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog');
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId) {
      loadBlog();
    }
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error loading blog details. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to List
      </Button>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {blog.category.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          {new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Blog+Image';
          }}
        />

        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

// Create Blog Form Component
const CreateBlogForm: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState<CreateBlogDto>({
    title: '',
    category: [],
    description: '',
    coverImage: '',
    content: '',
  });
  const [categoryInput, setCategoryInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (categoryInput.trim() && !formData.category.includes(categoryInput.trim().toUpperCase())) {
      setFormData({
        ...formData,
        category: [...formData.category, categoryInput.trim().toUpperCase()],
      });
      setCategoryInput('');
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== cat),
    });
  };

  const handleSubmit = async () => {
    if (formData.title && formData.description && formData.content && formData.category.length > 0) {
      try {
        setIsSubmitting(true);
        setError(null);
        await createBlog(formData);
        onSuccess();
        onClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create blog');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8">
        <CardHeader>
          <CardTitle>Create New Blog</CardTitle>
          <CardDescription>Fill in the details to create a new blog post</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Categories *</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="Add category (e.g., TECH)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
              />
              <Button type="button" onClick={handleAddCategory} variant="secondary">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.category.map((cat) => (
                <Badge key={cat} variant="secondary" className="pl-2 pr-1">
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the blog"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Cover Image URL</label>
            <Input
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Content *</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your blog content here..."
              rows={8}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Blog'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Main App Component
export default function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBlogCreated = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">CA Monk Blog</h1>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Blog
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:h-[calc(100vh-180px)] lg:overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
            <BlogList 
              onSelectBlog={setSelectedBlogId} 
              selectedBlogId={selectedBlogId}
              refreshTrigger={refreshTrigger}
            />
          </div>

          <div className="lg:h-[calc(100vh-180px)] lg:overflow-y-auto lg:sticky lg:top-32">
            {selectedBlogId ? (
              <BlogDetail blogId={selectedBlogId} onBack={() => setSelectedBlogId(null)} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <p className="text-lg mb-2">Select a blog to view details</p>
                  <p className="text-sm">Click on any blog card to see the full content</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showCreateForm && (
        <CreateBlogForm 
          onClose={() => setShowCreateForm(false)} 
          onSuccess={handleBlogCreated}
        />
      )}
    </div>
  );
}