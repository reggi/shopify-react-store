import React from 'react'

export default function (props) {
  return (
    <html lang='en' dir='ltr' className='multi-step mac chrome desktop page--no-banner page--logo-main page--show  js flexbox flexboxlegacy rgba multiplebgs boxshadow opacity cssanimations csstransitions generatedcontent svg inlinesvg cors boxsizing display-table pointerevents placeholder mediaqueries floating-labels'>
      <head>
        <title>React Shopify Example</title>
        <meta charSet='utf-8' />
      </head>
      <body>
        {props.children}
      </body>
    </html>
  )
}
