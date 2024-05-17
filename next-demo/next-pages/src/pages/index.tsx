import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import React from 'react';
import { structure } from '../helpers/structure';
import { Anchor } from '@epam/uui-components';
import { Text } from '@epam/promo';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link
                    rel='icon'
                    href='/favicon.ico'
                />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Demo</h1>
                <div className={`${styles.grid} withGap`}>
                    {structure
                        .filter((it) => it.previewImage)
                        .map((item) => {
                            return (
                                <Anchor
                                    key={item.id}
                                    link={item.link}
                                    cx={styles.card}
                                >
                                    <div
                                        className={styles.cardImage}
                                        style={{
                                            backgroundImage: `url(${item.previewImage})`,
                                        }}
                                    >
                                        <Image
                                            alt=''
                                            width={500}
                                            height={200}
                                            src={item.previewImage}
                                            className={`${styles.cardImage} ${styles.hidden}`}
                                        />
                                        <Text
                                            font='sans-semibold'
                                            lineHeight='30'
                                            fontSize='24'
                                            cx={styles.cardText}
                                        >
                                            {item.name}
                                        </Text>
                                    </div>
                                </Anchor>
                            );
                        })}
                </div>
            </main>
        </div>
    );
};

export default Home;
