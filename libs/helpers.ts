// Hapus impor Price
// import { Price } from '@/types';

// Fungsi validateUuid tetap berguna
export const validateUuid = (
  id: string | undefined | null,
  errorMessage = 'Invalid UUID'
): string => {
  if (!id || id === 'undefined') {
    throw new Error(errorMessage);
  }
  return id;
};

// Fungsi getURL tetap berguna
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? //* Atur ini ke URL situs Anda di env produksi.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? //* Diatur otomatis oleh Vercel.
    'http://localhost:3000/';
  //* Pastikan menyertakan `https://` jika bukan localhost.
  url = url.includes('http') ? url : `https://${url}`;
  //* Pastikan menyertakan `/` di akhir.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

// Fungsi postData disederhanakan, tipe data dibuat lebih generik
// Anda bisa mengganti 'any' dengan tipe yang lebih spesifik jika tahu apa yang akan dikirim
export const postData = async ({ url, data }: { url: string; data?: any }) => {
  // console.log('posting,', url, data);

  try { // Tambahkan try-catch untuk penanganan error fetch
    const response = await fetch(url, {
      method: 'POST',
      headers: { // Gunakan objek literal untuk header
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin', // Sesuaikan jika perlu
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Coba dapatkan pesan error dari body respons jika ada
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (e) {
        // Abaikan jika body bukan JSON
      }
      console.error('Error in postData:', {
         url,
         status: response.status,
         statusText: response.statusText,
         errorBody
        });
      throw new Error(response.statusText || 'Fetch failed');
    }

    // Periksa apakah respons memiliki body sebelum mencoba parse JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    } else {
        return await response.text(); // Atau kembalikan null/undefined jika tidak ada body
    }

  } catch (error) {
    console.error('Fetch error in postData:', error);
    // Re-throw error agar bisa ditangkap di tempat pemanggilan
    throw error;
  }
};


// Fungsi toDateTime mungkin tidak lagi digunakan setelah menghapus fitur Stripe,
// tapi bisa dibiarkan jika mungkin berguna di tempat lain.
export const toDateTime = (secs: number) => {
  // Gunakan '1970-01-01T00:00:00Z' sebagai basis epoch standar
  var t = new Date('1970-01-01T00:00:00Z');
  t.setUTCSeconds(secs); // Gunakan setUTCSeconds agar konsisten
  return t;
};
