import { API_URL } from '@/util/envExport';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface AuthorApplicationProps {
  fullName: string;
  email: string;
  phone: string;
  currentCompany: string;
  genre: string;
  previousPublications: string;
  pfp: File | null;
  identification: File | null;
  writingSample: File | null;
}

const ApplicationForm = () => {
  const [form, setForm] = useState<AuthorApplicationProps>({
    fullName: '',
    email: '',
    phone: '',
    currentCompany: '',
    genre: '',
    previousPublications: '',
    pfp: null,
    identification: null,
    writingSample: null,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setForm({ ...form, [name]: files[0] });
    }
  };

  const submit = async () => {
    try{
        const body = new FormData();
        if(form.pfp)
        body.append('pfp', form.pfp);
        if(form.identification)
        body.append('identification', form.identification);
        if(form.writingSample)
        body.append('writingSample', form.writingSample);
        body.append('fullName', form.fullName);
        body.append('email', form.email);
        body.append('phone', form.phone);
        body.append('currentCompany', form.currentCompany);
        body.append('genre', form.genre);
        body.append('previousPublications', form.previousPublications);
        
        const response = await fetch(`${API_URL}/api/author/apply`, {
            method: 'POST',
            body: body,
            headers: {
                'session': localStorage.getItem('sessionToken') as string
            }
        });
        if(response.ok) toast.success('Application submitted successfully');
        else toast.error('An error occurred');  
    }catch(error){
        console.log(error);
    }
  };

  return (
    <section>
      <div className="pt-20 text-3xl bold font-semibold flex justify-center">Apply to become an Author?</div>
      <div className="flex pt-2 justify-center text-gray-400">
        <h3>
          By applying to become an author you are able to publish your
          own books.
        </h3>
      </div>
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-7 dark:bg-background">
          <form>
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
              <div className="sm:col-span-12">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Submit your application
                </h2>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-full-name"
                  className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                >
                  Full name
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-submit-application-full-name"
                    type="text"
                    name="fullName"
                    onChange={handleTextChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-slate-800 dark:focus:ring-neutral-600"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-email"
                  className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                >
                  Email
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-submit-application-email"
                  type="email"
                  name="email"
                  onChange={handleTextChange}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-phone"
                  className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                >
                  Phone
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-submit-application-phone"
                  type="text"
                  name="phone"
                  onChange={handleTextChange}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-current-company"
                  className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                >
                  Current Company
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-submit-application-current-company"
                  type="text"
                  name="currentCompany"
                  onChange={handleTextChange}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-genre"
                  className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                >
                  Genre/Specialization
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-submit-application-genre"
                  type="text"
                  name="genre"
                  onChange={handleTextChange}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="e.g., Fiction, Non-fiction, Romance"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-previous-publications"
                  className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                >
                  Previous Publications
                </label>
              </div>

              <div className="sm:col-span-9">
                <textarea
                  id="af-submit-application-previous-publications"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  rows={4}
                  name="previousPublications"
                  onChange={handleTextChange}
                  placeholder="List your previous works with titles, publication dates, and publishers."
                ></textarea>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-writing-sample"
                  className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                >
                  Writing Sample
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  type="file"
                  name="writingSample"
                  id="af-submit-application-writing-sample"
                  onChange={handleFileChange}
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                    file:bg--50 file:border-0
                    file:bg-gray-100 file:me-4
                    file:py-2 file:px-4
                    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
              <div className="sm:col-span-12">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">Identification</h2>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-pfp"
                  className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                >
                  Profile Picture
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  type="file"
                  name="pfp"
                  id="af-submit-application-pfp"
                  onChange={handleFileChange}
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                    file:bg--50 file:border-0
                    file:bg-gray-100 file:me-4
                    file:py-2 file:px-4
                    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-identification"
                  className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                >
                  Identification
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  type="file"
                  name="identification"
                  id="af-submit-application-identification"
                  onChange={handleFileChange}
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                    file:bg--50 file:border-0
                    file:bg-gray-100 file:me-4
                    file:py-2 file:px-4
                    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                />
              </div>
            </div>

            <div className="mt-5 grid">
              <button
                type="button"
                onClick={submit}
                className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-dark"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ApplicationForm;
