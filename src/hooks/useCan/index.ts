// import decode from 'jwt-decode';

interface UseCanParams {
  profiles?: number[];
}

// interface UserProps {
//   exp: number;
//   iat: number;
// }

function useCan({ profiles }: UseCanParams) {
  const userStorage = localStorage.getItem('@hair:user-1.0.0');

  if (!userStorage) {
    return false;
  }

  // const { token } = JSON.parse(userStorage);

  // const user: UserProps = decode(token);

  // if (profiles) {
  //   if (profiles?.length > 0) {
  //     const hasAllprofiles = profiles?.every((profile) => {
  //       return user?.profile
  //         .map((prof: ProfileProps) => prof.profile)
  //         .includes(profile);
  //     });

  //     if (!hasAllprofiles) {
  //       return false;
  //     }
  //   }
  // }

  return true;
}

export default useCan;
