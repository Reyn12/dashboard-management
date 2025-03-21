"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number | string;
  discountPercentage: number | string;
  rating: number | string;
  stock: number | string;
  brand: string;
  category: string;
  thumbnail: string;
}

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  productId: number | null;
}

export default function ModalEdit({ isOpen, onClose, onSuccess, productId }: ModalEditProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: ""
  });

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        
        setFormData({
          id: data.id,
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          discountPercentage: data.discountPercentage || "",
          rating: data.rating || "",
          stock: data.stock || "",
          brand: data.brand || "",
          category: data.category || "",
          thumbnail: data.thumbnail || ""
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Gagal mengambil data produk");
        setLoading(false);
        onClose();
      }
    };
  
    if (productId && isOpen) {
      fetchProductDetails();
    }
  }, [productId, isOpen, onClose]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Validasi data
      if (!formData.title || !formData.price) {
        toast.error("Nama produk dan harga harus diisi");
        setLoading(false);
        return;
      }

      // Update produk ke API
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          discountPercentage: Number(formData.discountPercentage),
          rating: Number(formData.rating),
          stock: Number(formData.stock),
          brand: formData.brand,
          category: formData.category,
          thumbnail: formData.thumbnail
        })
      });

      const result = await response.json();
      
      if (result) {
        toast.success("Produk berhasil diperbarui");
        onSuccess();
        onClose();
      } else {
        toast.error("Gagal memperbarui produk");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Terjadi kesalahan saat memperbarui produk");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Produk</DialogTitle>
          <DialogDescription>
            Ubah informasi produk di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <Input
              placeholder="Nama Produk"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <Input
              placeholder="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Harga"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Diskon (%)"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Stok"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              placeholder="URL Thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="col-span-2">
            <Textarea
              placeholder="Deskripsi"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}