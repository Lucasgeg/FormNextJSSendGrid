import Head from "next/head";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm();

  //state
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSended, setIsSended] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onSubmitHandler = async (data) => {
    if (!isLoading) {
      setIsLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      setIsLoading(false);

      if (!response.ok) {
        console.log("error");
      } else {
        setIsSended(true);
        reset();
      }
    }
  };
  return (
    <>
      <Head>
        <title>Contact | Super projet Belivemy</title>
      </Head>
      <div style={{ textAlign: "center" }}>
        <h1>Formulaire de contact</h1>
        {/* form */}
        <form
          style={{ width: "500px", margin: "auto" }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {isSended && (
            <p>
              Votre message à bien été envoyer, vous recevrez une réponse très
              prochainement!
            </p>
          )}
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "30px",
              borderRadius: "5px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "15px",
              }}
            >
              <div style={{ margin: "0" }}>
                <label htmlFor="prenom" className="label">
                  Prénom
                </label>
                <input
                  className="input"
                  placeholder="prénom"
                  {...register("prenom", { required: true })}
                />
                {errors.prenom && <small>Merci de rentrer votre prénom</small>}
              </div>
              <div style={{ margin: "0" }}>
                <label htmlFor="nom" className="label">
                  Nom
                </label>
                <input
                  className="input"
                  placeholder="Nom"
                  id="nom"
                  {...register("nom", { required: true })}
                />
                {errors.nom && <small>Merci de rentrer votre Nom</small>}
              </div>
            </div>
            <div style={{ marginTop: "15px" }}>
              <label htmlFor="email" className="label">
                Adresse Email
              </label>
              <input
                className="input"
                placeholder="Adresse Email"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && <small>Merci de rentrer votre email</small>}
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "30px",
              borderRadius: "5px",
              textAlign: "left",
              marginTop: "15px",
            }}
          >
            <div>
              <label htmlFor="contenu" className="label">
                Contenu du message
              </label>
              <textarea
                className="input"
                id=""
                rows="9"
                placeholder="Bonjour..."
                {...register("contenu", { required: true })}
              ></textarea>
              {errors.contenu && (
                <small>Rien à dire? Alors rien à envoyer</small>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "15px",
            }}
          >
            <button style={{ padding: "5px 10px" }} disabled={isLoading}>
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
