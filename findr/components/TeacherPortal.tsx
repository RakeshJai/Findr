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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Teacher Dashboard</h2>
        {!isUploading && (
          <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium cursor-pointer hover:bg-indigo-700 transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            <span>Upload New Item</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
          </label>
        )}
      </div>

      {/* Upload Area */}
      {isUploading && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 shadow-lg overflow-hidden animate-fade-in">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/20">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              New Item Entry
            </h3>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 grid md:grid-cols-2 gap-8">
            {/* Image Preview */}
            <div className="space-y-4">
               <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 relative group">
                 {selectedImage ? (
                   <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
                 ) : (
                   <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">
                     No image selected
                   </div>
                 )}
               </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Item Name</label>
                <input
                  type="text"
                  value={formData.item_name}
                  onChange={(e) => setFormData({...formData, item_name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="e.g. Blue Backpack"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Brief details about the item..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={!formData.item_name || !formData.description}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  Save Item
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Management List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-200">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white">Manage Active Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-medium">Item</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Status / Claimant</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400 dark:text-slate-500">
                    No items uploaded yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className={`transition-colors ${item.claimedBy ? 'bg-yellow-50/50 dark:bg-yellow-900/10 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image_url} alt="" className="w-10 h-10 rounded-md object-cover bg-slate-100 dark:bg-slate-700" />
                        <div>
                           <div className="font-medium text-slate-900 dark:text-white">{item.item_name}</div>
                           <div className="text-xs text-slate-400 dark:text-slate-500">{new Date(item.timestamp).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {item.claimedBy ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-xs font-bold">
                          <UserCheck className="w-3 h-3" />
                          Claimed by {item.claimedBy}
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 italic">Unclaimed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.claimedBy ? (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
                          title="Confirm Handover & Delete"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Handover
                        </button>
                      ) : (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors"
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