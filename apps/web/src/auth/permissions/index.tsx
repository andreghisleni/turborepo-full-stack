import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ShowJson } from '@/components/show-json';

export const checkPermissions = (pagePermissions: string[], showError = false) => {
  const permissions = getCookie('permissions', {
    cookies,
  });

  if (!permissions) {
    if (showError) {
      return (
        <div>
          <h1>Don`t have permissions</h1>
          <ShowJson data={permissions} />
        </div>
      );
    }
    return redirect('/');
  }

  const parsedPermissions = JSON.parse(permissions);

  if (!parsedPermissions || parsedPermissions.length === 0) {
    if (showError) {
      return (
        <div>
          <h1>Don`t have permissions</h1>
          <ShowJson data={parsedPermissions} />
        </div>
      );
    }
    return redirect('/');
  }

  if (!pagePermissions.every(permission => parsedPermissions.includes(permission))) {
    if (showError) {
      return (
        <div>
          <h1>Don`t have permissions</h1>
          <ShowJson
            data={{
              pagePermissions,
              parsedPermissions,

              not_mach: pagePermissions.filter(p => !parsedPermissions.includes(p)),
            }}
          />
        </div>
      );
    }
    return redirect('/');
  }
};
