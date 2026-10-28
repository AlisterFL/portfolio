import type { Metadata } from "next";
import Link from "next/link";
import { LegalList, LegalPage, LegalSection, LegalValue } from "@/components/pro/LegalPage";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité · Alister Flandrinck",
  description:
    "Quelles données personnelles sont traitées sur alisterflandrinck.com, pourquoi, combien de temps, et comment exercer vos droits.",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  const { editor, host } = legal;

  return (
    <LegalPage title="Politique de confidentialité">
      <p>
        Cette page explique quelles données personnelles sont traitées lorsque vous consultez {legal.siteUrl} ou que
        vous me contactez, pourquoi, et quels sont vos droits. En bref&nbsp;:{" "}
        <strong>
          le portfolio n&apos;utilise ni cookie, ni outil de mesure d&apos;audience, ni traceur publicitaire
        </strong>
        , et vos données ne sont jamais vendues ni cédées.
      </p>

      <LegalSection title="Responsable du traitement">
        <p>
          {editor.name}, <LegalValue value={editor.status} />, <LegalValue value={editor.address} />. Pour toute
          question relative à vos données&nbsp;: <a href={`mailto:${editor.email}`}>{editor.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Lorsque vous me contactez">
        <p>
          Si vous m&apos;écrivez par email ou via LinkedIn, je reçois les informations que vous choisissez de me
          transmettre&nbsp;: nom, adresse email, entreprise, contenu de votre message et, le cas échéant, numéro de
          téléphone.
        </p>
        <LegalList>
          <li>
            <strong>Finalité&nbsp;:</strong> répondre à votre demande, établir un devis et assurer le suivi de votre
            projet.
          </li>
          <li>
            <strong>Base légale&nbsp;:</strong> mesures précontractuelles prises à votre demande, puis exécution du
            contrat si nous travaillons ensemble (article 6.1.b du RGPD).
          </li>
          <li>
            <strong>Durée de conservation&nbsp;:</strong> 3 ans à compter de notre dernier échange si aucun projet
            n&apos;est engagé. Pour les clients, pendant toute la durée de la relation, puis 10 ans pour les pièces
            comptables (factures), comme l&apos;exige le Code de commerce.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Lorsque vous consultez le site">
        <p>
          Comme tout serveur web, l&apos;hébergeur enregistre des journaux techniques à chaque visite&nbsp;: adresse IP,
          date et heure, page consultée et type de navigateur.
        </p>
        <LegalList>
          <li>
            <strong>Finalité&nbsp;:</strong> assurer le bon fonctionnement et la sécurité du site.
          </li>
          <li>
            <strong>Base légale&nbsp;:</strong> intérêt légitime (article 6.1.f du RGPD).
          </li>
          <li>
            <strong>Durée de conservation&nbsp;:</strong> durée limitée fixée par l&apos;hébergeur. Je n&apos;exploite pas
            ces journaux pour suivre les visiteurs.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Cookies et stockage local">
        <p>
          Le portfolio ne dépose aucun cookie. Les polices de caractères sont hébergées sur le site lui-même&nbsp;: votre
          navigateur ne contacte aucun service tiers en l&apos;affichant.
        </p>
        <p>
          Si vous changez la langue du site, ce choix est enregistré dans le stockage local de votre navigateur (clé{" "}
          <code className="rounded bg-[#0A0A0A]/[0.05] px-1.5 py-0.5 text-[13px]">language</code>). Il ne quitte
          jamais votre appareil, sert uniquement à afficher le site dans la langue choisie et, à ce titre, ne
          nécessite pas votre consentement. Vous pouvez l&apos;effacer à tout moment depuis les réglages de votre
          navigateur.
        </p>
      </LegalSection>

      <LegalSection title="Page de démonstration">
        <p>
          Le site héberge également une maquette réalisée pour un client, accessible à l&apos;adresse{" "}
          <code className="rounded bg-[#0A0A0A]/[0.05] px-1.5 py-0.5 text-[13px]">/kosmos</code>. Elle affiche une
          carte Google Maps et des images hébergées par des services tiers (Unsplash, JouwWeb)&nbsp;: en la consultant,
          ces services reçoivent votre adresse IP et peuvent appliquer leurs propres politiques de confidentialité.
          Ses formulaires sont factices et n&apos;envoient aucune donnée.
        </p>
      </LegalSection>

      <LegalSection title="Destinataires">
        <p>Vos données sont accessibles uniquement à moi et aux prestataires techniques qui les hébergent&nbsp;:</p>
        <LegalList>
          <li>
            <LegalValue value={host.name} /> — hébergement du site&nbsp;;
          </li>
          <li>Google (Gmail) — messagerie électronique ;</li>
          <li>
            LinkedIn — si vous me contactez via LinkedIn, qui agit alors comme responsable du traitement de sa
            propre plateforme.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Transferts hors de l'Union européenne">
        <p>
          Certains de ces prestataires, dont Vercel et Google, sont établis aux États-Unis. Ces transferts sont encadrés par la
          décision d&apos;adéquation de la Commission européenne relative au cadre de protection des données UE –
          États-Unis (Data Privacy Framework) ou, à défaut, par des clauses contractuelles types.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous pouvez à tout moment demander l&apos;accès à vos données, leur rectification, leur effacement, la
          limitation de leur traitement ou leur portabilité, vous opposer à leur traitement, et définir des
          directives sur leur sort après votre décès.
        </p>
        <p>
          Il suffit d&apos;écrire à <a href={`mailto:${editor.email}`}>{editor.email}</a>&nbsp;: je réponds dans un
          délai d&apos;un mois. Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une
          réclamation à la CNIL (
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          , 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07).
        </p>
      </LegalSection>

      <LegalSection title="Liens externes">
        <p>
          Les liens vers mes réalisations ou vers LinkedIn mènent à des sites tiers, soumis à leur propre politique
          de confidentialité. Voir aussi les <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
