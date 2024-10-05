import { OrgAbilityCan, PolicyOrgHandlerCallback } from '@/utils/org-ability';
import { unstable_noStore } from 'next/cache';
import { ReactNode } from 'react';
import { z } from 'zod';
/* eslint react/display-name: 0 */

const pageParams = z.object({
  searchParams: z.object({
    pageIndex: z.coerce.number().default(0),
    pageSize: z.coerce.number().default(10),
    filterFilter: z.string().default(''),
  }),
});

export function BasePage<ExtraProps extends z.ZodTypeAny>(
  a: PolicyOrgHandlerCallback,
  func: (p: z.infer<typeof pageParams> & z.infer<ExtraProps>) => ReactNode,
  extraProps?: ExtraProps,
) {
  return (props: z.infer<typeof pageParams> & z.infer<ExtraProps>) => {
    unstable_noStore();

    const r = OrgAbilityCan(a);

    if (r) {
      return r;
    }

    const pS = extraProps ? pageParams.merge(extraProps as any) : pageParams;

    const p = pS.safeParse(props);

    if (!p.success) {
      return <div>Invalid parameters</div>;
    }

    return func(p.data as any);
  };
}

export function BasePageJustBaseFilter(
  a: PolicyOrgHandlerCallback,
  func: (p: z.infer<typeof pageParams>) => ReactNode,
) {
  return (props: z.infer<typeof pageParams>) => {
    unstable_noStore();

    const r = OrgAbilityCan(a);

    if (r) {
      return r;
    }

    const pS = pageParams;

    const p = pS.safeParse(props);

    if (!p.success) {
      return <div>Invalid parameters</div>;
    }

    return func(p.data as any);
  };
}

export function BasePageWithoutFilter<ExtraProps extends z.ZodTypeAny>(
  a: PolicyOrgHandlerCallback,
  func: (p: z.infer<ExtraProps>) => ReactNode,
  extraProps: ExtraProps,
) {
  return (props: z.infer<ExtraProps>) => {
    unstable_noStore();

    const r = OrgAbilityCan(a);

    if (r) {
      return r;
    }

    const pS = extraProps;

    const p = pS.safeParse(props);

    if (!p.success) {
      return <div>Invalid parameters</div>;
    }

    return func(p.data);
  };
}
export function BasePageWithoutFilterAndPermission<ExtraProps extends z.ZodTypeAny>(
  func: (p: z.infer<ExtraProps>) => ReactNode,
  extraProps: ExtraProps,
) {
  return (props: z.infer<ExtraProps>) => {
    unstable_noStore();

    const pS = extraProps;

    const p = pS.safeParse(props);

    if (!p.success) {
      return <div>Invalid parameters</div>;
    }

    return func(p.data);
  };
}
