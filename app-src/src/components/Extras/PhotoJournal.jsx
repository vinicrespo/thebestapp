import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Camera, Image, ArrowLeftRight, Trash2, X, CalendarDays, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'alkalean_photo_journal';

const getPhotos = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
};

const savePhotos = (photos) => localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const daysBetween = (a, b) => Math.round(Math.abs(new Date(a) - new Date(b)) / 86400000);

const PhotoJournal = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [photos, setPhotos] = useState(getPhotos);
  const [view, setView] = useState('gallery');
  const [compareA, setCompareA] = useState(null);
  const [compareB, setCompareB] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [label, setLabel] = useState('front');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 800;
        let w = img.width, h = img.height;
        if (w > maxSize || h > maxSize) {
          if (w > h) { h = (h / w) * maxSize; w = maxSize; }
          else { w = (w / h) * maxSize; h = maxSize; }
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        const newPhoto = {
          id: Date.now().toString(),
          data: dataUrl,
          date: new Date().toISOString(),
          label,
        };
        const updated = [newPhoto, ...photos];
        setPhotos(updated);
        savePhotos(updated);
        setUploading(false);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDelete = (id) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    savePhotos(updated);
    setSelectedPhoto(null);
    if (compareA === id) setCompareA(null);
    if (compareB === id) setCompareB(null);
  };

  const startCompare = () => {
    if (photos.length >= 2) {
      setCompareA(photos[photos.length - 1].id);
      setCompareB(photos[0].id);
      setView('compare');
    }
  };

  const photoById = (id) => photos.find(p => p.id === id);

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />

      <div className="mb-5">
        <div className="flex items-center space-x-2">
          <Camera size={24} className="text-[#6B3FA0]" />
          <h1 className="text-2xl font-bold text-gray-900">Photo Journal</h1>
        </div>
        <p className="text-gray-500 text-sm mt-1">Track your visual transformation over time</p>
      </div>

      {/* View Tabs */}
      <div className="flex rounded-xl border border-gray-200 overflow-hidden mb-5">
        <button
          onClick={() => setView('gallery')}
          className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${view === 'gallery' ? 'bg-[#6B3FA0] text-white' : 'bg-white text-gray-500'}`}
        >
          <Image size={14} />
          <span>Gallery</span>
        </button>
        <button
          onClick={startCompare}
          disabled={photos.length < 2}
          className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${view === 'compare' ? 'bg-[#6B3FA0] text-white' : 'bg-white text-gray-500'} disabled:opacity-40`}
        >
          <ArrowLeftRight size={14} />
          <span>Compare</span>
        </button>
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[90] bg-black/90 flex flex-col items-center justify-center animate-fade-in" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-sm mx-4 w-full" onClick={e => e.stopPropagation()}>
            <img src={photoById(selectedPhoto)?.data} alt="" className="w-full rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
              <p className="text-white font-bold text-sm">{formatDate(photoById(selectedPhoto)?.date)}</p>
              <p className="text-white/60 text-xs capitalize">{photoById(selectedPhoto)?.label} view</p>
            </div>
            <button
              onClick={() => handleDelete(selectedPhoto)}
              className="absolute top-3 right-3 bg-red-500/80 text-white p-2 rounded-full"
            >
              <Trash2 size={16} />
            </button>
            <button onClick={() => setSelectedPhoto(null)} className="absolute top-3 left-3 bg-white/20 text-white p-2 rounded-full">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {view === 'gallery' && (
        <>
          {/* Add Photo */}
          <div className="mb-5">
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                {['front', 'side', 'back'].map(l => (
                  <button
                    key={l}
                    onClick={() => setLabel(l)}
                    className={`px-3 py-1.5 text-[10px] font-bold capitalize transition-all ${label === l ? 'bg-[#6B3FA0] text-white' : 'bg-white text-gray-500'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full bg-[#6B3FA0] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#5A2E8E] transition-colors disabled:opacity-50"
            >
              <Camera size={18} />
              <span>{uploading ? 'Saving...' : 'Take Progress Photo'}</span>
            </button>
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={28} className="text-gray-300" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">No photos yet</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                Take your first progress photo to start tracking your visual transformation. We recommend one photo per week.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-sm flex items-center">
                  <CalendarDays size={16} className="text-[#D4874D] mr-2" />
                  Timeline ({photos.length} photos)
                </h3>
              </div>

              {/* Stats */}
              {photos.length >= 2 && (
                <div className="bg-gradient-to-r from-[#F0ECF9] to-[#FEF0E4] rounded-2xl p-4 mb-4 border border-[#6B3FA0]/10">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-lg font-black text-[#6B3FA0]">{photos.length}</p>
                      <p className="text-[9px] text-gray-500 font-bold">Photos</p>
                    </div>
                    <div>
                      <p className="text-lg font-black text-[#D4874D]">{daysBetween(photos[photos.length - 1].date, photos[0].date)}</p>
                      <p className="text-[9px] text-gray-500 font-bold">Days Tracked</p>
                    </div>
                    <div>
                      <p className="text-lg font-black text-emerald-600">{new Set(photos.map(p => p.label)).size}</p>
                      <p className="text-[9px] text-gray-500 font-bold">Angles</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Photo Grid */}
              <div className="grid grid-cols-3 gap-2">
                {photos.map(photo => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo.id)}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all"
                  >
                    <img src={photo.data} alt="" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                      <p className="text-[9px] text-white font-bold">{formatDate(photo.date)}</p>
                      <p className="text-[8px] text-white/60 capitalize">{photo.label}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {view === 'compare' && (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
            <h3 className="font-bold text-gray-900 text-sm mb-3 text-center">Side by Side</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Before */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Before</p>
                {compareA && photoById(compareA) ? (
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#6B3FA0]/20">
                    <img src={photoById(compareA).data} alt="" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-[10px] text-white font-bold">{formatDate(photoById(compareA).date)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[3/4] rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <p className="text-xs text-gray-400">Select</p>
                  </div>
                )}
              </div>

              {/* After */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">After</p>
                {compareB && photoById(compareB) ? (
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#D4874D]/20">
                    <img src={photoById(compareB).data} alt="" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-[10px] text-white font-bold">{formatDate(photoById(compareB).date)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[3/4] rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <p className="text-xs text-gray-400">Select</p>
                  </div>
                )}
              </div>
            </div>

            {compareA && compareB && photoById(compareA) && photoById(compareB) && (
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                  <span className="font-bold text-[#6B3FA0]">{daysBetween(photoById(compareA).date, photoById(compareB).date)} days</span> between these photos
                </p>
              </div>
            )}
          </div>

          {/* Photo Selector */}
          <h3 className="font-bold text-gray-900 text-sm mb-2">Tap to select photos</h3>
          <p className="text-xs text-gray-500 mb-3">First tap = Before, second tap = After</p>
          <div className="grid grid-cols-4 gap-2">
            {photos.map(photo => {
              const isA = compareA === photo.id;
              const isB = compareB === photo.id;
              return (
                <button
                  key={photo.id}
                  onClick={() => {
                    if (isA) { setCompareA(null); return; }
                    if (isB) { setCompareB(null); return; }
                    if (!compareA) setCompareA(photo.id);
                    else setCompareB(photo.id);
                  }}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                    isA ? 'border-[#6B3FA0] ring-2 ring-[#6B3FA0]/20' :
                    isB ? 'border-[#D4874D] ring-2 ring-[#D4874D]/20' :
                    'border-transparent'
                  }`}
                >
                  <img src={photo.data} alt="" className="w-full h-full object-cover" />
                  {(isA || isB) && (
                    <div className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${isA ? 'bg-[#6B3FA0]' : 'bg-[#D4874D]'}`}>
                      {isA ? 'B' : 'A'}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                    <p className="text-[8px] text-white font-bold">{formatDate(photo.date)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Weekly Reminder */}
      {photos.length > 0 && view === 'gallery' && (
        <div className="mt-5 bg-amber-50 rounded-2xl p-4 border border-amber-200">
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>Tip:</strong> Take a new photo every week, same angle, same lighting. Small changes are hard to see daily — but week over week, the difference is undeniable.
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoJournal;
