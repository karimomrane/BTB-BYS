import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            adresse: user.adresse,
            tel: user.tel,
            siteweb: user.siteweb,
            role: user.role,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    return (
        <motion.section
            className={className}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.header variants={inputVariants}>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </motion.header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {['name', 'email', 'adresse', 'tel', 'siteweb', 'role'].map(
                    (field, index) => (
                        <motion.div key={field} variants={inputVariants}>
                            <InputLabel
                                htmlFor={field}
                                value={field.charAt(0).toUpperCase() + field.slice(1)}
                            />
                            <TextInput
                                id={field}
                                type={field === 'email' ? 'email' : 'text'}
                                className={`mt-1 block w-full ${
                                    field === 'role'
                                        ? 'bg-gray-100 text-gray-500'
                                        : ''
                                }`}
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                                required={field !== 'adresse' && field !== 'tel' && field !== 'siteweb'}
                                disabled={field === 'role'}
                                autoComplete={field}
                            />
                            <InputError className="mt-2" message={errors[field]} />
                        </motion.div>
                    )
                )}

                {mustVerifyEmail && user.email_verified_at === null && (
                    <motion.div variants={inputVariants}>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </motion.div>
                )}

                <motion.div
                    className="flex items-center gap-4"
                    variants={inputVariants}
                >
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </motion.div>
            </form>
        </motion.section>
    );
}
