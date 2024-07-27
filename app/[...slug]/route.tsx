import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const slogan = 'Build My #Personal_Intelligence #Programming_Insights #Passive_Income';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
): Promise<Response> {
  try {
    const slugString = params.slug.join('/');
    const match = slugString.match(/^(.+?)(\.x(\d+))?\.png$/u); // 使用 'u' 标志来处理 Unicode 字符
    if (!match) {
      console.error('Invalid URL format:', slugString);
      throw new Error('Invalid URL format');
    }

    const [, rawTitle, , resolutionFactor = '1'] = match;
    const title = decodeURIComponent(rawTitle);
    const factor = parseInt(resolutionFactor, 10);

    const baseWidth = 1200;
    const baseHeight = 630;
    const width = baseWidth * factor;
    const height = baseHeight * factor;

    const background = '#FFFFFF';
    const radial = '#e5b751';

    // 加载自定义字体
    let fontData;
    try {
      const fontPath = path.resolve('./public/LXGWWenKaiLite-Regular.ttf');
      fontData = fs.readFileSync(fontPath);
    } catch (fontError) {
      console.error('Failed to load custom font:', fontError);
      // 如果字体加载失败，使用系统字体
      fontData = null;
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: background,
            backgroundImage: `radial-gradient(circle at ${25 * factor}px ${25 * factor}px, ${radial} 2%, transparent 0%), radial-gradient(circle at ${75 * factor}px ${75 * factor}px, ${radial} 2%, transparent 0%)`,
            backgroundSize: `${100 * factor}px ${100 * factor}px`,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${40 * factor}px`,
            fontFamily: 'LXGWWenKaiLite, sans-serif',
          }}
        >
          <svg width={180 * factor} height={180 * factor} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="circleClip">
                <circle cx={90 * factor} cy={90 * factor} r={70 * factor}/>
              </clipPath>
            </defs>
            <g clipPath="url(#circleClip)">
              <path fill="#cc5595" d={`M0,0 h${180 * factor} v${54 * factor} Q${135 * factor} ${36 * factor}, ${90 * factor} ${54 * factor} Q${45 * factor} ${72 * factor}, 0 ${54 * factor} Z`} />
              <path fill="#428bca" d={`M0,${58.5 * factor} Q${45 * factor} ${76.5 * factor}, ${90 * factor} ${58.5 * factor} Q${135 * factor} ${40.5 * factor}, ${180 * factor} ${58.5 * factor} v${85.5 * factor} Q${135 * factor} ${148.5 * factor}, ${126 * factor} ${126 * factor} Q${76.5 * factor} ${144 * factor}, 0 ${144 * factor} Z`} />
              <path fill="white" d={`M0,${130.5 * factor} Q${45 * factor} ${153 * factor}, ${90 * factor} ${130.5 * factor} Q${135 * factor} ${112.5 * factor}, ${180 * factor} ${130.5 * factor} v${18 * factor} H0 Z`} />
              <path fill="#e5b751" d={`M0,${135 * factor} Q${45 * factor} ${157.5 * factor}, ${90 * factor} ${135 * factor} Q${135 * factor} ${117 * factor}, ${180 * factor} ${135 * factor} v${45 * factor} H0 Z`} />
            </g>
          </svg>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: `${60 * factor}px`,
                fontWeight: 'bold',
                backgroundImage: 'linear-gradient(45deg, #e5b751, #1677b3, #cc5595)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textAlign: 'center',
                maxWidth: '90%',
                marginBottom: `${30 * factor}px`,
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
            <div style={{ height: 20 * factor }} />
            <div
              style={{
                fontSize: `${20 * factor}px`,
                backgroundImage: 'linear-gradient(45deg, #e5b751, #1677b3, #cc5595)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textAlign: 'center',
                maxWidth: '80%',
              }}
            >
              {slogan}
            </div>
          </div>
          <div
            style={{
              fontSize: `${50 * factor}px`,
              fontWeight: 'bold',
              backgroundImage: 'linear-gradient(45deg, #e5b751, #1677b3, #cc5595)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            BMPI
          </div>
        </div>
      ),
      {
        width,
        height,
        fonts: fontData ? [
          {
            name: 'LXGWWenKaiLite',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
        ] : undefined,
      }
    );
  } catch (e: unknown) {
    console.error(`Error generating image: ${e instanceof Error ? e.message : 'An unknown error occurred'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
