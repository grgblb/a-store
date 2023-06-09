import {Link} from "@alfalab/core-components/link";
import {Typography} from "@alfalab/core-components/typography";
import {MouseEventHandler} from "react";
import {Link as RouterLink} from "react-router-dom";

import styles from './index.module.css';

type Props = {
    className?: string,
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export const Logo = ({className, onClick}: Props) => {
    return (
        <Typography.Title
            tag="div"
            view="medium"
            weight="bold"
            className={className}
        >
            <Link
                Component={RouterLink}
                href="/"
                view='primary'
                underline={false}
                onClick={onClick}
            >
                <span className={styles.text}>A-Store</span>
            </Link>
        </Typography.Title>
    );
}
