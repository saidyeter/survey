interface AnswerTextProps {
  content: string,
  noNewLine?: boolean
}

export default function AnswerContent(props: AnswerTextProps) {

  const p = parseText(props.content)

  return (
    <>
      {p?.text}
      {(p?.video.name && p.video.url || p?.img.name && p.img.url) &&
        !props.noNewLine &&
        <br />
      }

      {p?.video.name && p.video.url &&
        <a className="underline mr-2" href={p.video.url} target="_blank">{p.video.name}</a>
      }
      {p?.img.name && p.img.url &&
        <a className="underline" href={p.img.url} target="_blank">{p.img.name}</a>
      }
    </>
  )
}


function parseText(input: string) {
  const regex = /([^[]+)(?:\[(.+)]|$)/;
  const matches = input.match(regex);

  if (!matches) {
    return null;
  }

  const [, text, variables] = matches;

  const variableRegex = /(\w+):(?:'([^']+)'|"([^"]+)")/g;
  let match;
  const result: {
    text: string,
    video: {
      url: string | undefined,
      name: string | undefined
    },
    img: {
      url: string | undefined,
      name: string | undefined
    },
  } = {
    text,
    video: {
      url: undefined,
      name: undefined
    },
    img: {
      url: undefined,
      name: undefined
    },
  };

  while ((match = variableRegex.exec(variables)) !== null) {
    const [, key, singleQuotedValue, doubleQuotedValue] = match;
    const value = singleQuotedValue !== undefined ? singleQuotedValue : doubleQuotedValue;

    if (key === 'videourl' || key === 'videotext') {
      result.video[key === 'videourl' ? 'url' : 'name'] = value;
    } else if (key === 'imgurl' || key === 'imgtext') {
      result.img[key === 'imgurl' ? 'url' : 'name'] = value;
    }
  }


  return result;
}

