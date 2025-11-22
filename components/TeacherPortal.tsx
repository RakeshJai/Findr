import React, { useState } from 'react';
import { Trash2, Plus, X, Save, Image as ImageIcon, UserCheck, CheckCircle } from 'lucide-react';
import { LostItem, Category } from '../types';
import { fileToBase64 } from '../services/storageService';

interface TeacherPortalProps {
  items: LostItem[];
  onAdd: (item: LostItem) => void;
  onDelete: (id: string) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({ items, onAdd, onDelete }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Upload Form State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    category: Category.OTHER as string
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await fileToBase64(file);
      setSelectedImage(base64);
      setIsUploading(true);
    }
  };

  const handleSave = () => {
    if (!selectedImage) return;

    const newItem: LostItem = {
      id: crypto.randomUUID(),
      item_name: formData.item_name,
      description: formData.description,
      category: formData.category,
      image_url: selectedImage,
      uploaded_by: 'teacher-user',
      timestamp: Date.now()
    };

    onAdd(newItem);
    resetForm();
  };

  const resetForm = () => {
    setIsUploading(false);
    setSelectedImage(null);
    setFormData({ item_name: '', description: '', category: Category.OTHER });
  };

  return (
    <div className="space-y-8">
      
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-map font-bold text-coffee-900 dark:text-white">Teacher Dashboard</h2>
        {!isUploading && (
          <label className="flex items-center gap-2 px-5 py-2.5 bg-amber-700 text-white rounded-xl font-bold cursor-pointer hover:bg-amber-800 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200">
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
          </label>
        )}
      </div>

      {/* Upload Area */}
      {isUploading && (
        <div className="bg-parchment-50 dark:bg-stone-900 rounded-2xl border-2 border-amber-200 dark:border-stone-700 shadow-xl overflow-hidden animate-fade-in">
          <div className="p-6 border-b border-amber-100 dark:border-stone-700 flex justify-between items-center bg-amber-50/50 dark:bg-stone-800">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 font-map">
              <ImageIcon className="w-4 h-4" />
              Add New Item
            </h3>
            <button onClick={resetForm} className="text-coffee-400 hover:text-coffee-600 dark:hover:text-stone-300">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-8 grid md:grid-cols-2 gap-10">
            {/* Image Preview */}
            <div className="space-y-4">
               <div className="aspect-square rounded-xl bg-white dark:bg-stone-950 overflow-hidden border-2 border-dashed border-coffee-200 dark:border-stone-700 relative group flex items-center justify-center">
                 {selectedImage ? (
                   <img src={selectedImage} alt="Preview" className="w-full h-full object-contain p-2" />
                 ) : (
                   <div className="text-coffee-300 dark:text-stone-600 font-medium">
                     No image selected
                   </div>
                 )}
               </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-coffee-700 dark:text-stone-300 mb-2">Item Name</label>
                <input
                  type="text"
                  value={formData.item_name}
                  onChange={(e) => setFormData({...formData, item_name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-coffee-200 dark:border-stone-600 rounded-xl focus:ring-0 focus:border-amber-600 dark:focus:border-amber-500 outline-none bg-white dark:bg-stone-800 text-coffee-900 dark:text-white font-medium"
                  placeholder="e.g. Red Hoodie"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-coffee-700 dark:text-stone-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-coffee-200 dark:border-stone-600 rounded-xl focus:ring-0 focus:border-amber-600 dark:focus:border-amber-500 outline-none resize-none bg-white dark:bg-stone-800 text-coffee-900 dark:text-white font-medium"
                  placeholder="Describe where it was found or distinct features..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-coffee-700 dark:text-stone-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-coffee-200 dark:border-stone-600 rounded-xl focus:ring-0 focus:border-amber-600 dark:focus:border-amber-500 outline-none bg-white dark:bg-stone-800 text-coffee-900 dark:text-white font-medium"
                >
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={!formData.item_name || !formData.description}
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Save Item
                </button>
                <button
                  onClick={resetForm}
                  className="px-8 py-3 border-2 border-coffee-200 dark:border-stone-600 text-coffee-700 dark:text-stone-300 rounded-xl font-bold hover:bg-parchment-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Management List */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-coffee-200 dark:border-stone-800 shadow-sm overflow-hidden transition-colors duration-200">
        <div className="p-6 border-b border-coffee-100 dark:border-stone-800 bg-parchment-50/30 dark:bg-stone-900">
          <h3 className="font-bold text-coffee-900 dark:text-white font-map">Active Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-coffee-50 dark:bg-stone-950 text-coffee-500 dark:text-stone-400 border-b border-coffee-100 dark:border-stone-800">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Item Details</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Category</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-100 dark:divide-stone-800">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-coffee-400 dark:text-stone-600 font-medium italic">
                    No items recorded yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className={`transition-colors ${item.claimedBy ? 'bg-amber-50/50 dark:bg-amber-900/10 hover:bg-amber-100/50 dark:hover:bg-amber-900/20' : 'hover:bg-parchment-50 dark:hover:bg-stone-800'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg object-cover bg-stone-200 dark:bg-stone-700 border border-coffee-100 dark:border-stone-600" />
                        <div>
                           <div className="font-bold text-coffee-900 dark:text-white">{item.item_name}</div>
                           <div className="text-xs text-coffee-400 dark:text-stone-500 font-mono mt-0.5">{new Date(item.timestamp).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-coffee-600 dark:text-stone-300">
                      <span className="px-3 py-1 rounded-full bg-white dark:bg-stone-700 border border-coffee-200 dark:border-stone-600 text-xs font-bold">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-coffee-500 dark:text-stone-400">
                      {item.claimedBy ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs font-bold border border-amber-200 dark:border-amber-800/50">
                          <UserCheck className="w-3 h-3" />
                          Claimed by {item.claimedBy}
                        </span>
                      ) : (
                        <span className="text-coffee-400 dark:text-stone-500 italic">Unclaimed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.claimedBy ? (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                          title="Confirm Handover & Remove"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Complete
                        </button>
                      ) : (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="text-coffee-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};