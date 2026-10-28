import type { Metadata } from "next";
import Link from "next/link";
import { LegalInfo, LegalPage, LegalSection } from "@/components/pro/LegalPage";
import { legal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Mentions légales · Alister Flandrinck",
  description: "Mentions légales du site alisterflandrinck.fr : éditeur, hébergeur et propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  const { editor, host } = legal;

  return (
    <LegalPage title="Mentions légales">
      <p>
        Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN),
        voici les informations relatives à l&apos;éditeur et à l&apos;hébergeur du site {legal.siteUrl}.
      </p>

      <LegalSection title="Éditeur du site">
        <LegalInfo
          rows={[
            ["Nom", editor.name],
            ["Statut", editor.status],
            ["SIRET", editor.siret],
            ["Adresse", editor.address],
            ["Téléphone", editor.phone],
            ["Email", editor.email],
          ]}
        />
        <p className="pt-2">
          Directeur de la publication&nbsp;: <strong>{editor.name}</strong>.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <LegalInfo
          rows={[
            ["Hébergeur", host.name],
            ["Adresse", host.address],
            ["Contact", host.contact],
          ]}
        />
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus de ce site (textes, mise en page, éléments graphiques et code) est la propriété
          de {editor.name}, sauf mention contraire. Toute reproduction, représentation ou
          adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.
        </p>
        <p>
          Les noms, logos et captures d&apos;écran des projets présentés appartiennent à leurs titulaires respectifs
          et sont reproduits à titre de références client.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer sans préavis. Ce
          site contient des liens vers des sites externes (réalisations, LinkedIn) dont le contenu ne relève pas de la
          responsabilité de l&apos;éditeur.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Les pages du portfolio ne déposent aucun cookie et n&apos;utilisent aucun outil de mesure d&apos;audience.
          Le traitement des données que vous me transmettez en me contactant est détaillé dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit français. Pour toute question, vous pouvez écrire
          à <a href={`mailto:${editor.email}`}>{editor.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
