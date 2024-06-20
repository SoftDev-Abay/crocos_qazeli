import React, { TextareaHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { ChangeHandler } from "react-hook-form";
import classNames from "classnames";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	className?: string;
	name?: string;
	rows?: number;
	admin?: boolean;
	length?: number;
	register?: {
		onChange: ChangeHandler;
		onBlur: ChangeHandler;
		ref: React.Ref<any>;
		name: string;
	};
};

const TextArea: React.FC<Props> = ({
	className,
	name,
	register,
	admin = false,
	rows = 6,
	length,
	...props
}) => {
	return (
		<div className={styles.relative}>
			<textarea
				rows={rows}
				name={name || register?.name}
				ref={register?.ref}
				className={`${
					admin
						? classNames(styles.textAreaAdmin, className)
						: classNames(styles.textArea, className)
				} `}
				onChange={register?.onChange}
				onBlur={register?.onBlur}
				{...props}
			/>
			{admin && length ? (
				<span
					className={`${
						length === 150
							? classNames(styles.length, styles.lengthRed)
							: classNames(styles.length)
					}`}
				>
					{length}/150
				</span>
			) : (
				<></>
			)}
		</div>
	);
};

export default TextArea;
