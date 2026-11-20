const questions = [
  {
    question: "Comment se déroule une séance de sonothérapie ?",
    answer:
      "Une séance de sonothérapie dure généralement entre 60 et 90 minutes. Vous serez allongé(e) confortablement pendant que j'utilise différents instruments pour créer des vibrations harmonieuses qui favorisent la relaxation profonde.",
  },
  {
    question: "Faut-il se préparer avant une séance ?",
    answer:
      "Il est recommandé de porter des vêtements confortables et d'éviter de manger un repas lourd juste avant la séance. Venez simplement dans un état d'esprit ouvert et prêt à vous détendre.",
  },
  {
    question: "Quels sont les tarifs d'une séance ?",
    answer:
      "Les tarifs varient selon le type de séance. Une séance individuelle de sonothérapie coûte généralement entre 60€ et 90€. N'hésitez pas à me contacter pour plus de détails sur les forfaits disponibles.",
  },
  {
    question: "Proposez-vous des ateliers de groupe ?",
    answer:
      "Oui, j'organise régulièrement des ateliers de groupe et des bains sonores collectifs. Ces sessions sont idéales pour découvrir la sonothérapie dans une ambiance conviviale et à un tarif plus accessible.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-wash mt-12 rounded-2xl border p-6 shadow-sm sm:p-12">
      <h2 className="text-h3 mb-8 text-center text-brand-700">
        Foire Aux Questions
      </h2>
      <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {questions.map((item) => (
          <div key={item.question} className="mb-6">
            <dt className="mb-3 font-bold text-body">{item.question}</dt>
            <dd className="text-sm text-body">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
