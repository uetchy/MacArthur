import {
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_ERROR
} from './action-types';

export function fetchRepository(gitURL) {
  return (dispatch, getState) => {
    ghqGet(this.props.gitURL).then((result) => {
      if (result.stdout.includes("exists")) {
        dispatch({
          type: FETCH_REPOSITORY_ERROR,
          payload: {code: 'EXISTS'}
        });
        return;
      }
      dispatch({
        type: FETCH_REPOSITORY_SUCCESS,
        payload: result
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_REPOSITORY_ERROR,
        payload: error
      });
      // switch(error.code) {
      //   case 'NFOUND':
      //     console.error("Not found:");
      //     break;
      //   case 'GHQ_NFOUND':
      //     console.error("ghq command not found:")
      //     break;
      //   case 'GIT_NFOUND':
      //     console.error("git command not found:")
      //     break;
      //   default:
      //     console.error("Unexpected error:", err);
      // }
    })
  };
}
