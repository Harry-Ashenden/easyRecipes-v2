import easyRecipesIcon from "../assets/easyRecipes-icon.png"

const Footer = () => {
    return (
        <footer className="text-base-content">
            <aside className="bg-base-300 py-2 px-8 w-full flex gap-2 flex-wrap justify-between items-center text-sm">
                <p className="text-xl flex items-center gap-2">
                    <img alt="Logo" src={easyRecipesIcon} className="w-8" />
                    <span>easyRecipes</span>
                </p>
                <p>Copyright © 2024 - All rights reserved</p>
            </aside>
        </footer>
    );
};

export default Footer;
