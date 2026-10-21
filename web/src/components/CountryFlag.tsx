import {
  US,
  DE,
  GB,
  CA,
  AU,
  NL,
} from "country-flag-icons/react/3x2";

const flagComponents = {
  US,
  DE,
  GB,
  CA,
  AU,
  NL,
};

type CountryFlagProps = {
  code: keyof typeof flagComponents;
  name: string;
  className?: string;
};

export default function CountryFlag({
  code,
  name,
  className = "",
}: CountryFlagProps) {
  const Flag = flagComponents[code];

  return (
    <Flag
      title={name}
      role="img"
      aria-label={name}
      className={className}
    />
  );
}
