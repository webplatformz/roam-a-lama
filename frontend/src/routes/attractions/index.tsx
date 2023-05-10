import {component$} from '@builder.io/qwik';
import Header from "~/components/starter/header/header";
import AttractionInformation from "~/components/attraction-information/attraction-information";


export default component$(() => {

    return (
        <>
            <Header/>
            <AttractionInformation />
        </>
    );
});