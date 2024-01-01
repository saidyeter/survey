import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import Link from "next/link";

interface GoBackProps {
  link: string,
  title: string,
  desc: string
}
export default function GoBack(props: GoBackProps) {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{props.title}!</AlertTitle>
      <AlertDescription>
        {props.desc}
        <br />
        <Link
          href={props.link}
          className="underline"
        >
          Buraya
        </Link>
        &nbsp;tıklayarak geri dönebilirsiniz
      </AlertDescription>
    </Alert>
  )
}