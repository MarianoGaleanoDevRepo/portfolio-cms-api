import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import { getProfile, updateProfile, type Profile } from "../../api/profileApi";

function AdminProfilePage() {
    const [form, setForm] = useState<Profile>({
        fullName: "",
        professionalTitle: "",
        bio: "",
        linkedinUrl: "",
        githubUrl: "",
        cvUrl: "",
        contactEmail: "",
        avatarUrl: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setForm(data);
            } catch (error) {
                console.error("Error cargando perfil:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (field: keyof Profile, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await updateProfile(form);
            alert("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            alert("No se pudo actualizar el perfil");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_24%),linear-gradient(to_bottom_right,#09090b,#111827,#000000)] text-white">
            <Navbar />

            <main className="mx-auto max-w-5xl px-6 py-10">
                <div className="mb-10">
                    <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
                        Admin
                    </p>
                    <h1 className="mt-3 text-5xl font-bold tracking-tight">
                        Perfil público
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-zinc-400">
                        Edita la información visible en tu portfolio público.
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Input
                            placeholder="Nombre completo"
                            value={form.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                        />
                        <Input
                            placeholder="Título profesional"
                            value={form.professionalTitle}
                            onChange={(e) =>
                                handleChange("professionalTitle", e.target.value)
                            }
                        />
                    </div>

                    <div className="mt-4">
                        <Textarea
                            placeholder="Biografía"
                            value={form.bio}
                            onChange={(e) => handleChange("bio", e.target.value)}
                        />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <Input
                            placeholder="LinkedIn URL"
                            value={form.linkedinUrl}
                            onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                        />
                        <Input
                            placeholder="GitHub URL"
                            value={form.githubUrl}
                            onChange={(e) => handleChange("githubUrl", e.target.value)}
                        />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <Input
                            placeholder="CV URL"
                            value={form.cvUrl}
                            onChange={(e) => handleChange("cvUrl", e.target.value)}
                        />
                        <Input
                            placeholder="Email de contacto"
                            value={form.contactEmail}
                            onChange={(e) => handleChange("contactEmail", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <Input
                            placeholder="Avatar URL"
                            value={form.avatarUrl}
                            onChange={(e) => handleChange("avatarUrl", e.target.value)}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button onClick={handleSave}>
                            {loading ? "Guardando..." : "Guardar perfil"}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminProfilePage;
