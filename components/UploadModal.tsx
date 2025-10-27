'use client';

import uniqid from 'uniqid';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useUploadModal } from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { Modal } from './Modal'; 
import { Input } from './Input';
import { Button } from './Button';

export const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        setIsLoading(false); 
        return;
      }

      if (!user.id || user.id === 'undefined') {
         toast.error('Invalid user ID');
         setIsLoading(false);
         return;
      }


      const uniqueID = uniqid();
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed song upload.');
      }

      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imageError) {
        await supabaseClient.storage.from('songs').remove([songData.path]);
        setIsLoading(false);
        return toast.error('Failed image upload.');
      }

      const { error: supabaseError } = await supabaseClient.from('songs').insert({
        user_id: user.id, 
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (supabaseError) {
        await supabaseClient.storage.from('songs').remove([songData.path]);
        await supabaseClient.storage.from('images').remove([imageData.path]);
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      toast.success('Song created!');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload your audio file" 
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      {}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3"> {}
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: 'Song title is required' })} 
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: 'Song author is required' })} 
          placeholder="Song author"
        />
        <div>
          <div className="pb-1 text-sm text-neutral-400">Select a song file</div> {}
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept="audio/*" 
            {...register('song', { required: 'Song file is required' })} 
          />
        </div>
        <div>
           <div className="pb-1 text-sm text-neutral-400">Select an image</div> {}
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: 'Image file is required' })} 
          />
        </div>
        <Button disabled={isLoading} type="submit" className="mt-2"> {}
          Create
        </Button>
      </form>
    </Modal>
  );
};

UploadModal.displayName = 'UploadModal';
