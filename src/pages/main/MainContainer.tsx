import cn from 'classnames';
import { Route, Switch } from "react-router-dom";
import { homepageUrl } from '../../routes';
import MainView from './MainView';

type MainContainerType = React.ComponentProps<'div'>;
const MainContainer: React.FC<MainContainerType> = ({className, ...props}) =>{
  return (
    <>
      <div className={cn('flex-1', className)} {...props}>
        <Switch>
          <Route path={homepageUrl} component={MainView} />
        </Switch>
      </div>
    </>
  )
}

export default MainContainer;