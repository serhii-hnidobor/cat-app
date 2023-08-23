"use client";
import { Option, Select as HeadlessSelect } from "@mui/base";

interface Value {
  value: string | number | boolean;
  name: string;
}

interface Props {
  values: Value[];
  className?: string;
  listBoxClassName?: string;
  defaultValue?: string;
  onChange: (event: unknown, value: string | null) => void
}

function Select<TValue extends Value, Multiple extends boolean>({
  values,
  className,
  listBoxClassName,
  defaultValue,
  onChange,
}: Props) {
  return (
    <HeadlessSelect
      onChange={onChange}
      defaultValue={defaultValue}
      slotProps={{
        root: ({ focusVisible, open }) => ({
          className: `text-sm box-border w-80 px-3 py-2 rounded-lg text-left bg-white dark:bg-slate-800 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 outline-0 shadow shadow-slate-200 dark:shadow-slate-900 ${focusVisible ? "border-purple-400 shadow-outline-purple" : ""
            } ${open ? 'after:content-["▴"]' : 'after:content-["▾"]'
            } after:float-right`,
        }),
        listbox: {
          className: `text-sm p-1.5 my-3 w-[226px] rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 shadow shadow-slate-200 dark:shadow-slate-900 ${listBoxClassName ?? ''}`,
        },
      }}
      className={className}
    >
        {values.map(({ value, name }) => (
          <Option value={value} key={`${value}-${name}`} className="cursor-pointer">{name}</Option>
        ))}
    </HeadlessSelect>
  );
}

export default Select;
