"use client";

import { useState } from "react";
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

interface ModalTambahProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalTambah({ isOpen, onClose, onSuccess }: ModalTambahProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
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
      
      // Validasi form sederhana
      if (!formData.title || !formData.price || !formData.category) {
        toast.error("Judul, harga, dan kategori harus diisi!");
        return;
      }

      // Kirim data ke API dummyjson
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          discountPercentage: Number(formData.discountPercentage) || 0,
          rating: Number(formData.rating) || 0,
          stock: Number(formData.stock) || 0,
          brand: formData.brand,
          category: formData.category,
          thumbnail: formData.thumbnail || "https://placehold.co/600x400?text=No+Image",
        }),
      });

      const data = await response.json();
      
      if (data.id) {
        toast.success("Produk berhasil ditambahkan!");
        onSuccess();
        onClose();
        // Reset form
        setFormData({
          title: "",
          description: "",
          price: "",
          discountPercentage: "",
          rating: "",
          stock: "",
          brand: "",
          category: "",
          thumbnail: "",
        });
      } else {
        toast.error("Gagal menambahkan produk!");
      }
    } catch (error) {
      console.error("Error menambahkan produk:", error);
      toast.error("Terjadi kesalahan saat menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tambah Produk Baru</DialogTitle>
          <DialogDescription>
            Isi semua informasi produk yang diperlukan di bawah ini.
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
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}